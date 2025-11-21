/**
 * Storybook stories for the Drawer component
 * 
 * This file contains various usage examples and configurations of the Drawer component.
 * Each story demonstrates different features and use cases.
 * 
 * @file Drawer.stories.tsx
 */

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { Typography, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';
import { within, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Basic drawer with simple text content
 * 
 * Demonstrates the simplest usage with a title and plain text content.
 * Opens from the left side by default with standard open/close callbacks.
 */
export const BasicDrawer: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        onOpen: () => console.log('Drawer opened'),
        title: 'Drawer Title',
        content: 'This is the drawer content.',
        openButton: true,
        openButtonProps: {
            content: 'Open Drawer',
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Find and click the open button
        const openButton = canvas.getByRole('button');
        await user.click(openButton);

        // Wait for drawer to open and verify title
        await waitFor(() => {
            const title = body.getByText('Drawer Title');
            if (!title) throw new Error('Drawer title not found');
        });

        // Verify content is visible
        body.getByText('This is the drawer content.');

        // Click close button
        const closeButton = body.getByTestId('CloseIcon').closest('button');
        if (closeButton) await user.click(closeButton);
    },
};

/**
 * Drawer with menu icon as open button
 * 
 * Shows how to use an icon as the trigger button instead of text.
 * Uses outlined variant with secondary color for the button.
 */
export const WithMenuIcon: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'Settings',
        content: 'Configure your application settings here.',
        openButton: true,
        openButtonProps: {
            content: <MenuIcon />,
            variant: 'outlined',
            color: 'secondary',
            'aria-label': 'Open settings',
        },
    },
};

/**
 * Drawer sliding from the right side
 * 
 * Demonstrates using the position prop to change which side
 * the drawer slides in from. Includes an info icon in the button.
 */
export const RightSideDrawer: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'Information',
        content: <Typography>This drawer slides in from the right side.</Typography>,
        position: 'right',
        openButton: true,
        openButtonProps: {
            content: 'Open Right',
            startIcon: <InfoIcon />,
            variant: 'contained',
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open the right-side drawer
        const openButton = canvas.getByRole('button');
        await user.click(openButton);

        // Verify drawer opens with correct content
        await waitFor(() => {
            const info = body.getByText('This drawer slides in from the right side.');
            if (!info) throw new Error('Drawer content not found');
        });

        // Close the drawer using the close button
        const closeButton = body.getByTestId('CloseIcon').closest('button');
        if (closeButton) await user.click(closeButton);
    },
};

/**
 * Drawer with custom width
 * 
 * Shows how to customize the drawer width beyond the default 400px.
 * This example uses 600px width for a wider panel.
 */
export const CustomWidth: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'Wide Drawer',
        content: <Typography>This drawer has a custom width of 600px.</Typography>,
        width: 600,
        openButton: true,
        openButtonProps: {
            content: 'Open Wide Drawer',
            variant: 'contained',
        },
    },
};

/**
 * Drawer with complex content including a navigation list
 * 
 * Demonstrates rendering complex React components as content.
 * Includes MUI List components for navigation menu use case.
 */
export const WithComplexContent: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'Navigation Menu',
        content: (
            <Box>
                <Typography variant="body2" gutterBottom>
                    Select a page:
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
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
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        ),
        width: 300,
        openButton: true,
        openButtonProps: {
            content: 'Menu',
            startIcon: <MenuIcon />,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open the drawer
        const menuButton = canvas.getByText('Menu');
        await user.click(menuButton);

        // Wait for drawer to open and verify navigation items
        await waitFor(() => {
            const dashboard = body.getByText('Dashboard');
            if (!dashboard) throw new Error('Navigation items not found');
        });

        // Verify all menu items are present
        body.getByText('Profile');
        body.getByText('Settings');
        body.getByText('Logout');

        // Click on a menu item
        const profileItem = body.getByText('Profile');
        await user.click(profileItem);
    },
};

/**
 * Drawer without a close button
 * 
 * Shows how to hide the close button, requiring users to
 * click outside the drawer or use ESC key to close it.
 */
export const NoCloseButton: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'No Close Button',
        content: 'This drawer has no close button. Click outside to close.',
        closeButton: false,
        openButton: true,
        openButtonProps: {
            content: 'Open (No Close Button)',
            variant: 'outlined',
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open the drawer
        const openButton = canvas.getByRole('button');
        await user.click(openButton);

        // Wait for drawer to open
        await waitFor(() => {
            const title = body.getByText('No Close Button');
            if (!title) throw new Error('Drawer not opened');
        });

        // Click on the backdrop to close (tests MuiDrawer's onClose callback)
        const backdrop = document.querySelector('.MuiBackdrop-root');
        if (backdrop) {
            await user.click(backdrop as HTMLElement);
        }
    },
};

/**
 * Left-side drawer with settings icon
 * 
 * Demonstrates left positioning (default) with an icon button.
 * Uses primary color for emphasis on the open button.
 */
export const LeftPositionWithIcon: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'Settings Panel',
        content: <Typography>Adjust your preferences here.</Typography>,
        position: 'left',
        openButton: true,
        openButtonProps: {
            content: 'Settings',
            startIcon: <SettingsIcon />,
            variant: 'contained',
            color: 'primary',
        },
    },
};

/**
 * Drawer sliding from the top
 * 
 * Demonstrates using top position, which uses height instead of width.
 * Tests the vertical drawer positioning.
 */
export const TopPositionDrawer: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        title: 'Top Drawer',
        content: <Typography>This drawer slides in from the top.</Typography>,
        position: 'top',
        width: 200,
        openButton: true,
        openButtonProps: {
            content: 'Open Top',
            variant: 'contained',
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);
        const user = userEvent.setup();

        // Open the top drawer
        const openButton = canvas.getByRole('button');
        await user.click(openButton);

        // Wait for drawer to open and verify content
        await waitFor(() => {
            const content = body.getByText('This drawer slides in from the top.');
            if (!content) throw new Error('Top drawer content not found');
        });

        // Close the drawer
        const closeButton = body.getByTestId('CloseIcon').closest('button');
        if (closeButton) await user.click(closeButton);
    },
};

/**
 * Drawer without a title
 * 
 * Shows minimal configuration with content only.
 * The close button remains right-aligned even without a title.
 */
export const NoTitle: Story = {
    args: {
        open: false,
        onClose: () => console.log('Drawer closed'),
        content: <Typography>This drawer has no title, just content.</Typography>,
        openButton: true,
        openButtonProps: {
            content: 'Open No Title',
            variant: 'text',
        },
    },
};