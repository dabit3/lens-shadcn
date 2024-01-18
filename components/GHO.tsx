import { Avatar, Paper, RingProgress, Loader, Image, Center, MantineProvider, Text, Group, Space, Divider, Accordion, rem, Container, List} from "@mantine/core";

export function GHO() {

    return(
        <>
        
        
        <Container size="xl">
  
    
  <Paper>
    <Group>
    <Image mah={555} fit="contain" radius="md" src="https://pbs.twimg.com/profile_images/1626214565586341888/c47OgI-R_400x400.jpg"/>
 
 <div>
 <Text fw={555} fz={66}>
        GHO   Stablecoin
      </Text>



 </div>
      
        </Group>
        </Paper>
        </Container>
   
    <Space h="xs"/>

    <Paper withBorder radius="md" p="lg" style={{ backgroundColor: "rgba(212, 177, 250, 0.68)" }}>
    
    <Group justify="right">
      <Text fw={700} size="lg" ta="right">
        GHO Who?
        </Text>


    <Avatar size="lg" radius="md" src="https://pbs.twimg.com/profile_images/1626214565586341888/c47OgI-R_400x400.jpg"/>

    </Group>
<Space h="md"/>
<Group justify="center">
    <List size="md">
  <List.Item>GHO is a decentralized, overcollateralized stablecoin native to the Aave Protocol.</List.Item>
  <Space h="xs"/>
  <List.Item>Launched on Ethereum Mainnet, available as an ERC20-Token.</List.Item>
  <Space h="xs"/>
  <List.Item>GHO is pegged to the value of the US Dollar.</List.Item>
  <Space h="xs"/>
  <List.Item>Users can mint GHO by supplying collateral.</List.Item>
  <Space h="xs"/>
  <List.Item>GHO is fully governed by the Aave DAO.</List.Item>
</List>
</Group>
<Space h="xs"/>
     </Paper>

     <Space h="xs"/>

     <Paper radius="md" p="xs" >
<Group justify="left">
<Avatar size="lg" radius="md" src="https://pbs.twimg.com/profile_images/1626214565586341888/c47OgI-R_400x400.jpg"/>
<div>
<Text fw={700} size="lg" ta="right">
    GHO What?
    </Text>
  
   
</div>

  </Group>
  <Space h="md"/>
 <Container>
  <Accordion variant="separated" radius="xl" transitionDuration={555} defaultValue="1" >
<Accordion.Item value="1">
<Accordion.Control >
  What is GHO
</Accordion.Control>
<Accordion.Panel>Content</Accordion.Panel>
</Accordion.Item>

<Accordion.Item value="2">
<Accordion.Control>
  How is the value of GHO kept stable?
</Accordion.Control>
<Accordion.Panel>Content</Accordion.Panel>
</Accordion.Item>

<Accordion.Item value="3">
<Accordion.Control>
How to borrow GHO
</Accordion.Control>
<Accordion.Panel>Content</Accordion.Panel>
</Accordion.Item>

<Accordion.Item value="4">
<Accordion.Control>
How is GHO different from the other assets listed on the Aave markets?
</Accordion.Control>
<Accordion.Panel>Content</Accordion.Panel>
</Accordion.Item>

<Accordion.Item value="5">
<Accordion.Control>
What is a Facilitator and what does it mean for GHO?
</Accordion.Control>
<Accordion.Panel>Content</Accordion.Panel>
</Accordion.Item>
</Accordion>
</Container>
<Space h="xs"/>

 </Paper>

    
     <Space h="xs"/>

<Paper withBorder radius="md" p="lg" style={{ backgroundColor: "rgba(212, 177, 250, 0.68)" }}>

<Group justify="right">
<Text fw={700} size="lg" ta="right">
GHO Where?
</Text>


<Avatar size="lg" radius="md" src="https://pbs.twimg.com/profile_images/1626214565586341888/c47OgI-R_400x400.jpg"/>

</Group>

<Space h="md"/>
<Group justify="center">
<List size="md">
<List.Item>GHO is a decentralized, overcollateralized stablecoin native to the Aave Protocol.</List.Item>
<Space h="xs"/>
<List.Item>Launched on Ethereum Mainnet, available as an ERC20-Token.</List.Item>
<Space h="xs"/>
<List.Item>GHO is pegged to the value of the US Dollar</List.Item>
<Space h="xs"/>
<List.Item>Users can mint GHO by supplying collateral.</List.Item>
<Space h="xs"/>
<List.Item>GHO is fully governed by the Aave DAO.</List.Item>
</List>
</Group>
<Space h="xs"/>
</Paper>

<Space h="xs"/>
 
<Paper radius="md" p="lg">
    
    <Group justify="left">
    <Avatar size="lg" radius="md" src="https://pbs.twimg.com/profile_images/1626214565586341888/c47OgI-R_400x400.jpg"/>
      <Text fw={700} size="lg" ta="right">
        GHO When?
        </Text>


   

    </Group>
<Space h="md"/>
<Group justify="center">
<Image  mah={999}
fit="contain"
  src="https://docs.gho.xyz/assets/images/GHO_Architecture_dark-251977e57951155204cec015824d2e1b.png#gh-dark-mode-only"/>
</Group>
<Space h="xs"/>
     </Paper>

<Space h="xs"/>

<Paper radius="md" p="lg">
    
<Group justify="right">
    
    <Text fw={700} size="lg" ta="right">
      GHO Why?
      </Text>

<Avatar size="lg" radius="md" src="https://pbs.twimg.com/profile_images/1626214565586341888/c47OgI-R_400x400.jpg"/>

   

    </Group>
<Space h="md"/>
<Group justify="center">

</Group>
<Space h="xs"/>
     </Paper>
    
    
<Space h="md"/>
        
        </>
    )
}