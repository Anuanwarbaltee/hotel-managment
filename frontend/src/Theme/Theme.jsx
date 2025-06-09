// Theme.jsx
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                background: {
                    default: '#fff',
                    paper: '#f9f9f9',
                },
                text: {
                    primary: '#222',
                },
            }
            : {
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
                text: {
                    primary: '#f9f9f9',
                },
            }),
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: { fontWeight: 600, fontSize: '2rem' },
        h2: { fontWeight: 600, fontSize: '1.75rem' },
        h3: { fontWeight: 500, fontSize: '1.5rem' },
        h4: { fontWeight: 500, fontSize: '1.25rem' },
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    paddingLeft: 0, // Remove default 16px
                    // "&.item": {
                    //     paddingLeft: 0,
                    // }
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: 38,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:focus-visible': {
                        outline: 'none',
                    },
                },
            },
        },
    },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
