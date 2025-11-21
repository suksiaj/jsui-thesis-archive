/**
 * IconButton component - A button with optional icon support
 * 
 * This component extends MUI Button to provide a simplified interface for creating
 * buttons with icons, loading states, and various visual variants.
 * 
 * @file IconButton.tsx
 */

import * as React from 'react';
import Button from '@mui/material/Button';

/**
 * Props for the IconButton component
 */
export interface IconButtonProps {
    /**
     * The visual style variant of the button
     * @default 'contained'
     */
    variant?: 'outlined' | 'text' | 'contained';

    /**
     * The color theme of the button
     * @default 'primary'
     */
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

    /**
     * The content to display inside the button (text or elements)
     */
    content?: React.ReactNode;

    /**
     * Icon element to display before the button content
     */
    startIcon?: React.ReactNode;

    /**
     * Icon element to display after the button content
     */
    endIcon?: React.ReactNode;

    /**
     * If true, shows a loading spinner and disables the button
     * @default false
     */
    loading?: boolean;

    /**
     * If true, the button is disabled and cannot be clicked
     * @default false
     */
    disabled?: boolean;

    /**
     * Callback function fired when the button is clicked
     */
    onClick?: () => void;

    /**
     * The size of the button
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Accessible label for the button
     */
    'aria-label'?: string;
}

/**
 * IconButton component - A button with optional icon support
 * 
 * Extends MUI Button with a simplified API for common button patterns.
 * Supports icons before/after content, loading states, and all MUI button variants.
 * 
 * @example
 * ```tsx
 * import { IconButton } from '@suksiaj/jsui';
 * import SaveIcon from '@mui/icons-material/Save';
 * 
 * <IconButton
 *   content="Save"
 *   startIcon={<SaveIcon />}
 *   variant="contained"
 *   color="primary"
 *   onClick={() => console.log('Saved!')}
 * />
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = (
    {
        variant = 'contained',
        startIcon,
        endIcon,
        content,
        color = 'primary',
        loading = false,
        disabled = false,
        onClick,
        size = 'medium',
        'aria-label': ariaLabel,
    }) => {

    return (
        <Button
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            color={color}
            disabled={disabled}
            loading={loading}
            onClick={onClick}
            size={size}
            aria-label={ariaLabel}>
            {content}
        </Button>
    )
}
