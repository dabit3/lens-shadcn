'use client'
import {
    Container,
    Loader,
    Space,
    Text,
    Group,
    Center,
    Paper,
    Avatar,
    Grid,
    MantineProvider, 
    Divider,
    RingProgress,
  } from "@mantine/core";
import { useSearchPublications, SearchPublicationType } from '@lens-protocol/react-web';

import Post from "@/components/Post"
import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import dayjs from 'dayjs';
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

export default function Explore() {
    const surfFeed = useSearchPublications ({ query: "GHO",
        where: { publicationTypes: [SearchPublicationType.Post]},
    });
    
    // Define the pattern of xs spans
  const xsSpans = [4, 8, 8, 4, 3, 3, 6];
  const uniquePostIds = [...new Set(surfFeed?.data?.map(post => post))];

  const [ reserveData, setReserveData] = useState<any>(null);

  
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.public.blastapi.io"
  );

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



  async function fetchReserveData() {
    const ghoReserveData = await ghoService.getGhoReserveData();
    const formattedGhoReserveData = formatGhoReserveData({
      ghoReserveData,
    });

    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider: "0x4dd5ab8Fb385F2e12aDe435ba7AFA812F1d364D0", // Goerli GHO Market
    });

        // Array of incentive tokens with price feed and emission APR
      const reserveIncentives =
      await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
        lendingPoolAddressProvider: "0x4dd5ab8Fb385F2e12aDe435ba7AFA812F1d364D0", // Goerli GHO Market
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
  

    // @ts-ignore
    setReserveData(formattedGhoReserveData);
    console.log(formattedPoolReserves)
  }

  const facilitatorMintedPercentage = Math.round(reserveData?.aaveFacilitatorMintedPercent * 100);
  const unmintedPercentage = 100 - facilitatorMintedPercentage;

  useEffect(() => {
    fetchReserveData();
  }, []); 

    return(
        <>
        {reserveData ? (
      <>
     
     <Space h="xs"/>

     <Paper withBorder radius="md" p="xs">

<Group>
<Avatar size="lg" radius="md" src="https://pbs.twimg.com/profile_images/1720214545505914880/YWc2guA6_400x400.jpg"/>
<div>
<Text fw={700} size="lg">
    Aave Facilitator
    </Text>
    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
    Bucket Stats
    </Text>
</div>
    
  </Group>
  <Center>
  <RingProgress
  size={222}
  thickness={10}
  
  sections={[
    { value: facilitatorMintedPercentage, color: "rgba(212, 177, 250, 0.68)", tooltip:  `${reserveData?.aaveFacilitatorBucketLevel.toLocaleString()} Minted`},
    { value: unmintedPercentage, color: "rgba(237, 237, 237, 0.68)", tooltip: `${reserveData?.aaveFacilitatorRemainingCapacity.toLocaleString()} Unminted` },
  ]}
  label={
    <Center>
    <Text>
      {facilitatorMintedPercentage}% Minted
    </Text>
  </Center>
  }
 />
 </Center>

 <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
    Minted: {reserveData?.aaveFacilitatorBucketLevel.toLocaleString()}
    </Text>
  <Space h="xs"/>
    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
    Remaining: {reserveData?.aaveFacilitatorRemainingCapacity.toLocaleString()}
    </Text>
   
    <Divider my="md" />
    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
    Max: {reserveData?.aaveFacilitatorBucketMaxCapacity.toLocaleString()}
    </Text>
 </Paper>
 <Space h="xs"/>
      </>
    ) : (
      <Group justify="center">
      <Loader color="purple" />
    </Group>
    )}
        {surfFeed && (



 <Grid>
 {uniquePostIds?.map((post, index) => (
          <React.Fragment key={index}>
            <Grid.Col span={{ base: 12, xs: xsSpans[index % xsSpans.length] }}>
             <Post post={post as any}/>
              </Grid.Col>
              
            </React.Fragment>
        ))}

        
 </Grid>


        )}
       
        
        </>
    )
}