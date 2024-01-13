'use client'

import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function MantineAppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        
        <Group h="100%" px="md">
            
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          LensGHO
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
       
      </AppShell.Navbar>
      <AppShell.Main>

      { children }
      </AppShell.Main>
    </AppShell>
  );
}