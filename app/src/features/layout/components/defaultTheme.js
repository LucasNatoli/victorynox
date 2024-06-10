export const defaultTheme = {
  palette: {
    mode: "dark",
    primary: {
      light: "#E3F2FD",
      main: "#2196F3",
      dak: "#1E88E5",
    },
    secondary: {
      light: "#EDE7F6",
      main: "#673AB7",
      dak: "#5E35B1",
    },
    grey: {
      100: "#F5F5F5",
      900: "#212121",
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },

/*     MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '9px'
        },
      },
    }, */
  },
}