/**
 * Storybook stories for the NavBar component
 * 
 * This file contains various usage examples and configurations of the NavBar component.
 * Each story demonstrates different features and use cases.
 * 
 * @file NavBar.stories.tsx
 */

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, ListSubheader, Box, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { within, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const meta: Meta<typeof NavBar> = {
    title: 'Components/NavBar',
    component: NavBar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ['fixed', 'absolute', 'sticky', 'static', 'relative'],
        },
        color: {
            control: 'select',
            options: ['default', 'inherit', 'primary', 'secondary', 'transparent'],
        },
        showMenu: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

/**
 * Basic navigation bar with hamburger menu
 * 
 * Demonstrates the simplest usage with a title and hamburger menu.
 * Menu contains a basic navigation list.
 */
export const BasicNavBar: Story = {
    args: {
        title: 'My Application',
        position: 'static',
        showMenu: true,
        drawerProps: {
            onOpen: () => console.log('Menu opened'),
            onClose: () => console.log('Menu closed'),
            title: 'Menu',
            content: (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </ListItem>
                </List>
            ),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Find and click the hamburger menu button (it only has an icon, no text)
        const menuButton = canvas.getByRole('button');
        await user.click(menuButton);

        // Wait for drawer to open (drawer renders in portal outside canvas)
        await waitFor(() => {
            const drawer = body.getByText('Menu');
            if (!drawer) throw new Error('Drawer not found');
        });

        // Find and click a menu item
        const homeItem = body.getByText('Home');
        await user.click(homeItem);
    },
};

/**
 * Navigation bar with icons in menu
 * 
 * Shows how to add icons to menu items for better visual navigation.
 * Uses MUI ListItemIcon for icon placement.
 */
export const WithIconsInMenu: Story = {
    args: {
        title: 'Dashboard',
        position: 'static',
        color: 'primary',
        drawerProps: {
            title: 'Navigation',
            content: (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ContactMailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </ListItem>
                </List>
            ),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open the drawer (button only has an icon, no text)
        const menuButton = canvas.getByRole('button');
        await user.click(menuButton);

        // Wait for drawer content and verify icons are visible (drawer renders in portal)
        await waitFor(() => {
            const settingsItem = body.getByText('Settings');
            if (!settingsItem) throw new Error('Settings menu item not found');
        });

        // Click on a menu item with icon
        const aboutItem = body.getByText('About');
        await user.click(aboutItem);
    },
};

/**
 * Navigation bar with secondary color
 * 
 * Demonstrates using the secondary color theme.
 * Shows how different color palettes affect the app bar appearance.
 */
export const SecondaryColor: Story = {
    args: {
        title: 'Secondary Theme',
        position: 'static',
        color: 'secondary',
        drawerProps: {
            title: 'Menu',
            content: (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Reports" />
                        </ListItemButton>
                    </ListItem>
                </List>
            ),
        },
    },
};

/**
 * Navigation bar without hamburger menu
 * 
 * Shows the app bar with menu disabled.
 * Useful for simple headers without navigation.
 */
export const NoMenu: Story = {
    args: {
        title: 'Simple Header',
        position: 'static',
        showMenu: false,
    },
};

/**
 * Navigation bar with right-side drawer
 * 
 * Demonstrates placing the drawer on the right side.
 * Common pattern for settings or profile menus.
 */
export const RightSideMenu: Story = {
    args: {
        title: 'Right Menu App',
        position: 'static',
        drawerProps: {
            title: 'Account',
            position: 'right',
            content: (
                <>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            ),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open right-side drawer (button only has an icon, no text)
        const menuButton = canvas.getByRole('button');
        await user.click(menuButton);

        // Verify drawer opens with right-side content (drawer renders in portal)
        await waitFor(() => {
            const profileItem = body.getByText('Profile');
            if (!profileItem) throw new Error('Profile menu item not found');
        });

        // Click on Settings in the right drawer
        const settingsItem = body.getByText('Settings');
        await user.click(settingsItem);
    },
};

/**
 * Navigation bar with custom menu width
 * 
 * Shows how to customize the drawer width.
 * This example uses a wider 350px drawer.
 */
export const WideMenu: Story = {
    args: {
        title: 'Wide Drawer',
        position: 'static',
        drawerProps: {
            title: 'Navigation',
            width: 350,
            content: (
                <Box sx={{ p: 3 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Home"
                                    secondary="Go to homepage"
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="About"
                                    secondary="Learn more about us"
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Settings"
                                    secondary="Configure your preferences"
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            ),
        },
    },
};

/**
 * Navigation bar with grouped menu items
 * 
 * Demonstrates organizing menu items into sections with dividers.
 * Useful for complex navigation structures.
 */
export const GroupedMenu: Story = {
    args: {
        title: 'Organized App',
        position: 'static',
        drawerProps: {
            title: 'Menu',
            content: (
                <Box>
                    <List subheader={<ListSubheader>Main</ListSubheader>}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Analytics" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List subheader={<ListSubheader>Settings</ListSubheader>}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Preferences" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            ),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open drawer with grouped content (button only has an icon, no text)
        const menuButton = canvas.getByRole('button');
        await user.click(menuButton);

        // Wait for drawer to open and verify grouped sections (drawer renders in portal)
        await waitFor(() => {
            const dashboardItem = body.getByText('Dashboard');
            const analyticsItem = body.getByText('Analytics');
            const profileItem = body.getByText('Profile');
            if (!dashboardItem || !analyticsItem || !profileItem) {
                throw new Error('Grouped menu items not found');
            }
        });

        // Click on an item in the second group
        const preferencesItem = body.getByText('Preferences');
        await user.click(preferencesItem);
    },
};
