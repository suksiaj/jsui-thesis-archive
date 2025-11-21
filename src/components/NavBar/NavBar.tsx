/**
 * NavBar component - A navigation bar with optional hamburger menu
 * 
 * This component extends MUI AppBar to provide a simplified navigation bar
 * with integrated hamburger menu using the library's Drawer and IconButton components.
 * 
 * @file NavBar.tsx
 */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, type DrawerProps } from '../Drawer';

/**
 * Props for the NavBar component
 */
export interface NavBarProps {
    /**
     * The title displayed in the navigation bar
     */
    title?: string;

    /**
     * The position of the app bar
     * @default 'static'
     */
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';

    /**
     * The color theme of the app bar
     * @default 'primary'
     */
    color?: 'default'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';

    /**
     * If true, displays a hamburger menu button
     * @default true
     */
    showMenu?: boolean;

    /**
     * Props to customize the drawer component
     * @see DrawerProps
     * @example
     * ```tsx
     * <NavBar
     *   drawerProps={{
     *     title: 'Menu',
     *     content: <div>Menu Content</div>,
     *     position: 'left',
     *   }}
     * />
     * ```
     */
    drawerProps?: Omit<DrawerProps, 'open' | 'openButton' | 'openButtonProps'>;

    /**
     * Content to be rendered in the app bar (right side)
     */
    children?: React.ReactNode;
}

/**
 * NavBar component - A navigation bar with optional hamburger menu
 * 
 * Extends MUI AppBar with simplified API for common navigation patterns.
 * Integrates the library's Drawer and IconButton components for hamburger menu functionality.
 * 
 * @example
 * ```tsx
 * import { NavBar } from '@suksiaj/jsui';
 * import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
 * 
 * <NavBar
 *   title="My Application"
 *   position="fixed"
 *   menuContent={
 *     <List>
 *       <ListItem disablePadding>
 *         <ListItemButton>
 *           <ListItemText primary="Home" />
 *         </ListItemButton>
 *       </ListItem>
 *       <ListItem disablePadding>
 *         <ListItemButton>
 *           <ListItemText primary="About" />
 *         </ListItemButton>
 *       </ListItem>
 *     </List>
 *   }
 * />
 * ```
 */
export const NavBar: React.FC<NavBarProps> = ({
    title,
    position = 'static',
    color = 'primary',
    showMenu = true,
    drawerProps,
    children,
}) => {
    return (
        <AppBar position={position} color={color}>
            <Toolbar>
                {/* Hamburger menu button and drawer */}
                {showMenu && (
                    <Drawer
                        open={false}
                        openButton={true}
                        openButtonProps={{
                            content: <MenuIcon />,
                            variant: 'text',
                            size: 'large',
                            color: color === 'primary' ? 'secondary' : 'primary',
                            'aria-label': 'Open navigation menu',
                        }}
                        {...drawerProps}
                    />
                )}

                {/* App title */}
                {title && (
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            ml: showMenu ? 0 : 0,
                        }}
                    >
                        {title}
                    </Typography>
                )}

                {/* Additional content (right side) */}
                {!title && <Box sx={{ flexGrow: 1 }} />}
                {children}
            </Toolbar>
        </AppBar>
    );
};
