'use client'
import {
    useProfile,
  } from "@lens-protocol/react-web";
  import {
    Space,
    Card,
    Group,
    Avatar,
    Text,
    Image,
    Paper,
    SimpleGrid,
    Container,
  } from "@mantine/core";
  import styles from "./Profile.module.css";

 


export default function ProfilePage({
    params
} : {
    params: {
    handle: string
    }
}) {


    const profile = useProfile({
        forHandle: `lens/${params.handle}`,
      });

      console.log(profile)

       // Assuming data.createdAt is a string representing the timestamp
       // @ts-ignore
  const createdAtDate = new Date(profile?.data?.createdAt);

  // Format the date to display only Month Day, Year
  const formattedCreatedAt = createdAtDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
    
      const replaceURLs = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const atSymbolRegex = /(\S*@+\S*)/g;
    
        return text
          .replace(
            urlRegex,
            (url: any) => `<a href="${url}" target="_blank">${url}</a>`,
          )
          .replace(atSymbolRegex, (match: any) => ` ${match} `);
      };

    return(
        <>
        
        <Container>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            
            <Image
              // @ts-ignore
              alt={`${profile?.data?.handle?.localName}'s cover photo`}
              // @ts-ignore, image is there
              src={profile?.data?.metadata?.coverPicture?.optimized?.uri}
              height={333}
              fallbackSrc="https://pbs.twimg.com/profile_banners/1623341641149939713/1704475311/1500x500"
            />
          </Card.Section>

      <Group>
          <>
          <Avatar
            alt={`${profile?.data?.handle?.localName}'s profile picture`}
            // @ts-ignore, image is there
            src={
              profile?.data?.metadata?.picture &&
              "optimized" in profile?.data?.metadata?.picture
                ? profile?.data?.metadata?.picture.optimized?.uri
                : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
            }
            className={styles.avatar}
            size={123}
            radius="md"
           
            mt={-55}
          />
          </>

       
     

          <div>
         
            <Text fw={500}>{profile?.data?.metadata?.displayName}</Text>
          
@{profile?.data?.handle?.localName}
          </div>
          </Group>
          <Space h="xl" />

     



            {profile?.data?.metadata?.bio && (
              <>

          <Paper p="lg" radius="md">
            <Text
              fz="lg"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  profile &&
                  profile.data &&
                  profile.data.metadata &&
                  profile.data.metadata.bio
                    ? replaceURLs(
                        profile.data.metadata.bio.replace(/\n/g, "<br> "),
                      )
                    : "",
              }}
            />

<Space h="xl" />

<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }} >

      <Paper shadow="sm" p="lg" radius="md" >
          <Text fw={500} size="lg" ta="center">
               Created On
              </Text>
              <Text fw={500} c="dimmed" ta="center">
              {formattedCreatedAt}
              </Text>
              </Paper>
     
      <Paper shadow="sm" p="lg" radius="md" >
          <Text fw={500} size="lg" ta="center">
               Followers
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.followers}
              </Text>
              </Paper>
   
      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Following
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.following}
              </Text>
              </Paper>


      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Publications
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.publications}
              </Text>
              </Paper>
      
      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Upvotes
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.upvotes}
              </Text>
              </Paper>
     
      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Comments
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.comments}
              </Text>
              </Paper>
     
      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Mirror
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.mirrors}
              </Text>
              </Paper>
   
      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Collects
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.collects}
              </Text>
              </Paper>
    
      <Paper shadow="sm" p="lg" radius="md" >
              <Text fw={500} size="lg" ta="center">
               Quotes
              </Text>
              <Text fw={500} c="dimmed" ta="center">
                {profile?.data?.stats.quotes}
              </Text>
              </Paper>
     
    </SimpleGrid>


          </Paper>

          <Space h="xl" />
          </>
)}

  
       

         
        </Card>
        </Container>

        <Space h="xl" />
        
       
      
      
    
        </>
    )
}