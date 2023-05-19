import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    base: PaletteColor
  }
  interface PaletteOptions {
    base?: PaletteColorOptions
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    base: PaletteColor
  }
  interface PaletteOptions {
    base?: PaletteColorOptions
  }
}

const theme = createTheme({
  palette: {},

  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: '120%',
    },
    h2: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: '120%',
    },
    h4: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: '120%',
    },
    h5: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: '120%',
    },
    h6: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '120%',
    },
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '*': {
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          width: 'auto',
        },
      },
    },
  },
})

export { theme }
