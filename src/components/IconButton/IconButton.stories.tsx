/**
 * Storybook stories for the IconButton component
 * 
 * This file contains various usage examples and configurations of the IconButton component.
 * Each story demonstrates different features and use cases.
 * 
 * @file IconButton.stories.tsx
 */

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const meta: Meta<typeof IconButton> = {
    title: 'Components/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['outlined', 'text', 'contained'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        loading: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Primary button with contained variant
 * 
 * Demonstrates the default button style with filled background
 * and medium size. Uses primary color theme.
 */
export const Primary: Story = {
    args: {
        content: 'Primary Button',
        variant: 'contained',
        size: 'medium',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        // Find and click the primary button
        const button = canvas.getByRole('button', { name: /primary button/i });
        await user.click(button);
    },
};

/**
 * Secondary button with alternative color theme
 * 
 * Shows how to use the secondary color palette.
 * Maintains contained variant with medium size.
 */
export const Secondary: Story = {
    args: {
        content: 'Secondary Button',
        color: 'secondary',
        size: 'medium',
    },
};

/**
 * Button with start icon
 * 
 * Demonstrates placing an icon before the button text.
 * Uses Save icon with primary color and contained variant.
 */
export const WithStartIcon: Story = {
    args: {
        content: 'Save',
        startIcon: <SaveIcon />,
        variant: 'contained',
        color: 'primary',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        // Verify button has both icon and text
        const button = canvas.getByRole('button', { name: /save/i });
        await user.click(button);

        // Verify SaveIcon is present
        const icon = canvas.getByTestId('SaveIcon');
        if (!icon) throw new Error('Save icon not found');
    },
};

/**
 * Button with end icon
 * 
 * Shows an icon positioned after the button text.
 * Uses Send icon with secondary color theme.
 */
export const WithEndIcon: Story = {
    args: {
        content: 'Send',
        endIcon: <SendIcon />,
        variant: 'contained',
        color: 'secondary',
    },
};

/**
 * Outlined button variant
 * 
 * Demonstrates the outlined style with transparent background
 * and colored border. Includes download icon.
 */
export const Outlined: Story = {
    args: {
        content: 'Download',
        startIcon: <DownloadIcon />,
        variant: 'outlined',
        color: 'primary',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        // Find the outlined button
        const button = canvas.getByRole('button', { name: /download/i });
        
        // Verify it has the outlined class
        if (!button.classList.contains('MuiButton-outlined')) {
            throw new Error('Button does not have outlined variant class');
        }

        // Click the button
        await user.click(button);
    },
};

/**
 * Text button variant
 * 
 * Shows the minimal text-only style without background or border.
 * Useful for secondary actions or inline links.
 */
export const TextVariant: Story = {
    args: {
        content: 'Learn More',
        endIcon: <ArrowForwardIcon />,
        variant: 'text',
        color: 'primary',
    },
};

/**
 * Loading state button
 * 
 * Demonstrates the loading indicator with disabled interaction.
 * Shows spinner animation while processing.
 */
export const Loading: Story = {
    args: {
        content: 'Processing',
        loading: true,
        variant: 'contained',
        color: 'primary',
    },
};

/**
 * Disabled button
 * 
 * Shows the disabled state with reduced opacity.
 * Button cannot be clicked and shows visual feedback.
 */
export const Disabled: Story = {
    args: {
        content: 'Disabled',
        disabled: true,
        variant: 'contained',
        color: 'primary',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Find the disabled button
        const button = canvas.getByRole('button', { name: /disabled/i });
        
        // Verify it's disabled
        if (!button.hasAttribute('disabled')) {
            throw new Error('Button should be disabled');
        }
    },
};

/**
 * Error color button
 * 
 * Demonstrates using the error color theme for destructive actions.
 * Typically used for delete or cancel operations.
 */
export const ErrorButton: Story = {
    args: {
        content: 'Delete',
        startIcon: <DeleteIcon />,
        variant: 'contained',
        color: 'error',
    },
};

/**
 * Success color button
 * 
 * Shows the success color theme for positive actions.
 * Common for confirmations or completion states.
 */
export const SuccessButton: Story = {
    args: {
        content: 'Confirm',
        variant: 'contained',
        color: 'success',
    },
};

/**
 * Small size button
 * 
 * Demonstrates the small size variant for compact layouts.
 * Useful in toolbars or space-constrained areas.
 */
export const SmallSize: Story = {
    args: {
        content: 'Add',
        startIcon: <AddIcon />,
        variant: 'contained',
        size: 'small',
    },
};

/**
 * Large size button
 * 
 * Shows the large size variant for prominent actions.
 * Increased padding and font size for emphasis.
 */
export const LargeSize: Story = {
    args: {
        content: 'Get Started',
        endIcon: <ArrowForwardIcon />,
        variant: 'contained',
        color: 'primary',
        size: 'large',
    },
};

/**
 * Icon-only button
 * 
 * Demonstrates using the button with only an icon, no text.
 * Suitable for toolbars or when space is limited.
 * Requires aria-label for accessibility.
 */
export const IconOnly: Story = {
    args: {
        content: <SaveIcon />,
        variant: 'contained',
        color: 'primary',
        'aria-label': 'Save',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        // Find button by aria-label since it has no text
        const button = canvas.getByRole('button', { name: /save/i });
        
        // Verify aria-label is present for accessibility
        if (!button.getAttribute('aria-label')) {
            throw new Error('Icon-only button must have aria-label');
        }

        // Verify SaveIcon is present
        const icon = canvas.getByTestId('SaveIcon');
        if (!icon) throw new Error('Save icon not found');

        // Click the icon button
        await user.click(button);
    },
};
