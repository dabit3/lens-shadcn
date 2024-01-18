'use client'
import { AppShell} from '@mantine/core';
import { MantineHeader } from './MantineHeader/MantineHeader';

export function MantineAppShell({ children }) {

  return (
    <AppShell
      header={{ height: 60}}
      padding="md"
    >
      <AppShell.Header p="xs" >
        <MantineHeader />
      </AppShell.Header>

      <AppShell.Main>
      { children }
      </AppShell.Main>
    </AppShell>
  );
}