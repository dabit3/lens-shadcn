import { ethers } from "ethers";
import * as dayjs from 'dayjs'
import {
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
  GhoService,
} from "@aave/contract-helpers";
import {
  formatGhoReserveData,
  formatGhoUserData,
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
} from "@aave/math-utils";

// Sample RPC address for querying ETH goerli
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.public.blastapi.io"
);

// User address to fetch data for, insert address here
const currentAccount = "0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c";

// View contract used to fetch all reserves data (including market base currency data), and user reserves
// Using Aave V3 Eth goerli address for demo
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: "0x3De59b6901e7Ad0A19621D49C5b52cC9a4977e52", // Goerli GHO Market
  provider,
  chainId: ChainId.goerli,
});
const currentTimestamp = dayjs().unix();

// View contract used to fetch all reserve incentives (APRs), and user incentives
// Using Aave V3 Eth goerli address for demo
const incentiveDataProviderContract = new UiIncentiveDataProvider({
  uiIncentiveDataProviderAddress: "0xF67B25977cEFf3563BF7F24A531D6CEAe6870a9d", // Goerli GHO Market
  provider,
  chainId: ChainId.goerli,
});

const ghoService = new GhoService({
  provider,
  uiGhoDataProviderAddress: "0xE914D574975a1Cd273388035Db4413dda788c0E5", // Goerli GHO Market
});

export async function fetchContractData() {
  // Object containing array of pool reserves and market base currency data
  // { reservesArray, baseCurrencyData }
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: "0x4dd5ab8Fb385F2e12aDe435ba7AFA812F1d364D0", // Goerli GHO Market
  });

  // Object containing array or users aave positions and active eMode category
  // { userReserves, userEmodeCategoryId }
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: "0x4dd5ab8Fb385F2e12aDe435ba7AFA812F1d364D0", // Goerli GHO Market
    user: currentAccount,
  });

  // Array of incentive tokens with price feed and emission APR
  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x4dd5ab8Fb385F2e12aDe435ba7AFA812F1d364D0", // Goerli GHO Market
    });

  // Dictionary of claimable user incentives
  const userIncentives =
    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x4dd5ab8Fb385F2e12aDe435ba7AFA812F1d364D0", // Goerli GHO Market
      user: currentAccount,
    });

  const ghoReserveData = await ghoService.getGhoReserveData();
  const ghoUserData = await ghoService.getGhoUserData(currentAccount);

  const formattedGhoReserveData = formatGhoReserveData({
    ghoReserveData,
  });
  const formattedGhoUserData = formatGhoUserData({
    ghoReserveData,
    ghoUserData,
    currentTimestamp,
  });

  const formattedPoolReserves = formatReservesAndIncentives({
    reserves: reserves.reservesData,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: reserveIncentives,
  });

  const userSummary = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReserves.userReserves,
    formattedReserves: formattedPoolReserves,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
    reserveIncentives: reserveIncentives,
    userIncentives: userIncentives,
  });

  let formattedUserSummary = userSummary;
  // Factor discounted GHO interest into cumulative user fields
  if (formattedGhoUserData.userDiscountedGhoInterest > 0) {
    const userSummaryWithDiscount = formatUserSummaryWithDiscount({
      userGhoDiscountedInterest: formattedGhoUserData.userDiscountedGhoInterest,
      user: currentAccount,
      marketReferenceCurrencyPriceUSD: Number(
        formatUnits(
          reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
          USD_DECIMALS
        )
      ),
    });
    formattedUserSummary = {
      ...userSummary,
      ...userSummaryWithDiscount,
    };
  }

  console.log({
    formattedGhoReserveData,
    formattedGhoUserData,
    formattedPoolReserves,
    formattedUserSummary,
  });
}

fetchContractData();