import { Divider, Drawer as MuiDrawer, Box, Typography } from "@mui/material";
import * as React from "react";
import { IconButton, type IconButtonProps } from "../IconButton";

import CloseIcon from "@mui/icons-material/Close";

/**
 * Props for the Drawer component
 */
export interface DrawerProps {
  /**
   * If true, the drawer is open initially (uncontrolled mode)
   * @default false
   */
  open?: boolean;

  /**
   * Callback function fired when the drawer should close
   */
  onClose?: () => void;

  /**
   * Callback function fired when the drawer opens
   */
  onOpen?: () => void;

  /**
   * The title displayed at the top of the drawer
   */
  title?: string;

  /**
   * The content to be rendered inside the drawer
   */
  content?: React.ReactNode;

  /**
   * If true, displays a button to open the drawer
   * @default true
   */
  openButton?: boolean;

  /**
   * If true, displays a button to close the drawer
   * @default true
   */
  closeButton?: boolean;

  /**
   * Props to customize the open button appearance and behavior
   */
  openButtonProps?: IconButtonProps;

  /**
   * The side of the screen where the drawer appears
   * @default 'left'
   */
  position?: "left" | "right" | "top" | "bottom";

  /**
   * The width of the drawer (for left/right positions) or height (for top/bottom positions)
   * @default 400
   */
  width?: number | string;
}

/**
 * Drawer component - A slide-in panel from the side of the screen
 *
 * Extends MUI Drawer with simplified API for displaying side panels.
 * Includes optional open button, customizable position, and built-in close functionality.
 *
 * This component operates in uncontrolled mode, managing its own open/close state internally.
 * This is for ease of use in common scenarios where external state management is unnecessary.
 *
 * @example
 * ```tsx
 * import { Drawer } from '@suksiaj/jsui';
 *
 * <Drawer
 *   open={false}
 *   onClose={() => console.log('Closed')}
 *   title="Settings"
 *   content={<div>Your settings content here</div>}
 *   openButton={true}
 *   openButtonProps={{ content: 'Open Settings', variant: 'contained' }}
 *   position="right"
 * />
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  open = false,
  onClose,
  title,
  content,
  openButton = true,
  closeButton = true,
  openButtonProps,
  onOpen,
  position = "left",
  width = 400,
}) => {
  // Internal state to manage drawer open/close
  const [drawerOpen, setDrawerOpen] = React.useState(open);

  // Generate unique ID for title
  const titleId = React.useId();

  // Sync internal state with open prop changes
  React.useEffect(() => {
    setDrawerOpen(open);
  }, [open]);

  /**
   * Handles drawer open/close toggle
   */
  const handleDrawerToggle = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  // Determine drawer size based on position
  const isHorizontal = position === "left" || position === "right";
  const drawerSize = isHorizontal ? { width } : { height: width };

  return (
    <>
      {/* Button to open the drawer */}
      {openButton && (
        <IconButton
          onClick={() => handleDrawerToggle(true)}
          aria-label="Open drawer"
          {...openButtonProps}
        />
      )}

      {/* The drawer panel itself */}
      <MuiDrawer
        anchor={position}
        open={drawerOpen}
        onClose={() => handleDrawerToggle(false)}
        PaperProps={{
          role: "dialog",
          "aria-labelledby": title ? titleId : undefined,
          "aria-label": title ? undefined : "Drawer",
        }}
      >
        <Box
          sx={{
            ...drawerSize,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            {title ? (
              <Typography variant="h6" component="h2" id={titleId}>
                {title}
              </Typography>
            ) : (
              <Box />
            )}
            {closeButton && (
              <IconButton
                variant="text"
                onClick={() => handleDrawerToggle(false)}
                aria-label="Close drawer"
                content={<CloseIcon />}
              />
            )}
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>{content}</Box>
        </Box>
      </MuiDrawer>
    </>
  );
};
