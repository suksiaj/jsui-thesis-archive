import { createTheme } from "@mui/material/styles";

/**
 * Custom MUI theme for @suksiaj/jsui component library
 *
 * This theme provides default styling and design tokens for all components.
 * Use this theme by wrapping your application with MUI's ThemeProvider.
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from '@mui/material/styles';
 * import { theme } from '@suksiaj/jsui';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const theme = createTheme({
  /**
   * Color palette configuration
   * 
   * All colors meet or exceed WCAG AA accessibility standards for contrast ratios:
   * - Primary colors: 7.03:1 to 18.77:1 (excellent contrast)
   * - Secondary main (#bf360c): 5.60:1 (passes WCAG AA for normal text)
   * - Secondary light (#d84315): 4.44:1 (suitable for large text and UI components)
   * - Error (#d32f2f): 4.98:1 (passes WCAG AA for normal text)
   * - Warning (#e65100): 3.79:1 (suitable for large text and UI components)
   * - Info (#0277bd): 4.80:1 (passes WCAG AA for normal text)
   * - Success (#2e7d32): 5.13:1 (passes WCAG AA for normal text)
   * 
   * Primary: Navy blue - Used for primary actions and emphasis
   * Secondary: Deep orange - Complementary accent color
   * Error: Red - Error states and destructive actions
   * Warning: Dark orange - Warning states and cautions
   * Info: Deep blue - Informational messages
   * Success: Dark green - Success states and confirmations
   */
  palette: {
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#000051",
      contrastText: "#fff",
    },
    secondary: {
      main: "#bf360c", // Adjusted from #ff6f00 for WCAG AA compliance (5.60:1)
      light: "#d84315", // Adjusted from #ffa040 for WCAG compliance (4.44:1)
      dark: "#c43e00",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#e65100", // Adjusted from #f57c00 for better WCAG compliance
    },
    info: {
      main: "#0277bd", // Adjusted from #0288d1 for WCAG AA compliance
    },
    success: {
      main: "#2e7d32", // Adjusted from #388e3c for WCAG AA compliance
    },
  },
  /**
   * Typography configuration
   * 
   * Font family: Roboto (primary), with system font fallbacks
   * Headings: Medium weight (500) for h1, h2, h3
   * Buttons: No text transformation (preserves original case)
   */
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none", // Disable uppercase transformation on buttons
    },
  },
  /**
   * Spacing configuration
   * Base unit: 8px (used for padding, margins, gaps, etc.)
   * Usage: theme.spacing(1) = 8px, theme.spacing(2) = 16px, etc.
   */
  spacing: 8,
  /**
   * Shape configuration
   * Default border radius: 4px
   * Applied to components like Cards, Dialogs, etc.
   */
  shape: {
    borderRadius: 4,
  },
  /**
   * Component-specific style overrides and default props
   */
  components: {
    /**
     * MUI Button overrides
     * - Increased border radius (8px) for modern look
     * - Consistent padding (8px 16px)
     * - Elevation enabled by default
     */
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
      defaultProps: {
        disableElevation: false,
      },
    },
    /**
     * MUI Card overrides
     * - Increased border radius (8px) for consistency with buttons
     */
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
