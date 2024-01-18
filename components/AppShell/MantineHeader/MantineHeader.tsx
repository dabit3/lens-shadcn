import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Tooltip,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    TextInput,
    Container,
  } from '@mantine/core';
  import { useState } from 'react';
  import { useDisclosure } from '@mantine/hooks';
  import {
    IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser, IconSearch,
  } from '@tabler/icons-react';
  import classes from './MantineHeader.module.css';
import { ConnectKitButton } from 'connectkit';
import Link from 'next/link';
import { SearchUsers } from '@/components/Search/SearchUser';



const links = [
  { link: '/', label: 'Home' },
  { link: '/explore', label: 'Explore' },
  { link: '/profile', label: 'Profile' },
  
];

  
  export function MantineHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link} >
        {link.label}
      </Link>
    ));
  
    return (
      <Box>
        <Container size="lg">
        <header>
          <Group justify="space-between" h="100%">
            <Group>
              <Text size="xl">
              LensGHO

              </Text>
            

            <Group visibleFrom="sm" >
            {items}
            </Group>
            </Group>
                
            <Group h="100%" visibleFrom="sm">
              {/* @ts-ignore */}
            <SearchUsers />

            <ConnectKitButton />
            </Group>
  
            
      
             
            
            <Group hiddenFrom="sm">
            <ConnectKitButton />
            </Group>
          </Group>
        </header>
  
     
        </Container>
      </Box>
    );
  }