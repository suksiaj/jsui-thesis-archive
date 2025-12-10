# @suksiaj/jsui-thesis-archive

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-archived-lightgrey)](#)

**A custom React component library** built for personal use across multiple projects.  
It leverages **TypeScript**, **React**, and **MUI**, offering easily customizable styles to fit any project’s design needs.

---

## 🚀 Usage

Simply import the components you need:

```tsx
import { IconButton, Drawer, NavBar } from "@suksiaj/jsui";

export default function App() {
  return (
    <>
      <NavBar title="My App" showMenu />
      <IconButton content="Click me" variant="contained" />
    </>
  );
}
```

No additional `ThemeProvider` or setup is required to use the library.

---

## 🛣️ Roadmap

Implemented components:

- [x] `IconButton` — Customizable button with icon and loading state support
- [x] `Drawer` — Slide-in panel with customizable position and close behavior
- [x] `NavBar` — Navigation bar with integrated hamburger menu and drawer

---

## ⚙️ Technical Details

- **Language:** TypeScript 5.9.2 (`strict` mode with `noUncheckedIndexedAccess`)
- **Framework:** React 19.1.1
- **UI Foundation:** MUI 7.3.1 (Material-UI)
- **Build:** Rollup with dual output (CJS + ESM)
- **Module system:** ESNext (`type: module`)
- **Type declarations:** Auto-generated (`.d.ts`)
- **Styling:** MUI default theme with WCAG AA compliant colors
- **Testing:** Jest + Testing Library + Storybook interaction tests
- **Documentation:** Storybook 10.0.8 with comprehensive stories
- **Accessibility:** WCAG AA compliance (4.5:1 contrast ratios, ARIA labels, semantic HTML)

---

## 🖼️ Documentation & Examples

📚 **Full documentation available in Storybook:**

```bash
npm run storybook
```

Each component includes:

- Interactive examples and variants
- Comprehensive props documentation
- Automated interaction tests
- Accessibility guidelines
- JSDoc comments for IDE integration

---

## 📄 License

This library is released under the **MIT License**.  
It is primarily developed for **personal and portfolio purposes**.

---

## ✍️ Author

**Jesse Suksia**  
GitHub: [@suksiaj](https://github.com/suksiaj)


