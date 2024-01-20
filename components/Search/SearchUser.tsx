import {
    ActionIcon,
    Modal,
    Button,
    TextInput,
    Space,
    useMantineTheme,
    Text,
    Group,
    Loader,
    UnstyledButton,
    Avatar,
    Grid,
    Menu
  } from "@mantine/core";
  import { useState, useEffect} from "react";
  import Link from "next/link";
  import { useSearchProfiles, LimitType } from '@lens-protocol/react-web';
  import { IconSearch, IconX } from "@tabler/icons-react";
  import classes from "./Search.module.css";
  import { TbUserFilled } from "react-icons/tb";


  type SearchResultsProps = {
    query: string;
    closeSearch: () => void; 
  };
  
  export const SearchUsers = ({ query }: SearchResultsProps) => {
   
    
    const theme = useMantineTheme();
    const [searchInput, setSearchInput] = useState(""); 
    const { data, loading } = useSearchProfiles({ query: searchInput,
      limit: LimitType.Ten });

      const [opened, setOpened] = useState(false);
      
      useEffect(() => {
        // Check conditions and update the 'opened' state
        if (data && data.length > 0 && searchInput.length > 0) {
          setOpened(true);
        } else {
          setOpened(false);
        }
      }, [data, searchInput]); 
      
    return (
      <>
  <Menu width={222} opened={opened} zIndex={1111111111} closeOnItemClick={true}>
      <Menu.Target>
        <TextInput
          radius="xl"
          size="sm"
          placeholder="Search"
          variant="filled"
          value={searchInput} // Set the value of the input field
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          error={data && data.length === 0 && searchInput.length > 0 &&  ("No Users Found")}
          leftSection={<IconSearch size="1.0rem" />}
     
             rightSection={
            searchInput.length > 0 && loading ? (
              <Loader size={19} />
            ) : (
              searchInput.length > 0 && (
                <UnstyledButton
                  mt={5}
                  onClick={() => {setSearchInput("")}}
                >
                  <IconX size="1.1rem" />
                </UnstyledButton>
              )
            )
          }
          
          rightSectionWidth={42}
        />
</Menu.Target>
<Menu.Dropdown >
        {data && data.length > 0 && searchInput.length > 0 && (
          
          <>
          
          {data.map((user: any) => (
            <>
            <Menu.Item>
                <Group key={user?.id}>
                   <UnstyledButton
                  component={Link}
                  href={`/h/${user.handle?.localName}`}
                  className={classes.user}
                >
                  <Group>
                    <Avatar
                      alt={`${user.handle?.localName}'s profile picture`}
                      // @ts-ignore
                      src={
                        user.metadata?.picture &&
                        "optimized" in user.metadata?.picture
                          ? user.metadata?.picture.optimized?.uri
                          : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                      }
                      radius="xl"
                    />
  
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {user.metadata?.displayName || user.handle?.localName}
                      </Text>
  
                      <Text c="dimmed" size="xs">
                        @{user.handle?.localName}
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
                </Group>
                </Menu.Item>

</>
              ))}
          
       </>
       )}

</Menu.Dropdown>
       </Menu>
      </>
    );
  };