import React, { useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    useTheme,
    useMediaQuery,
    Tooltip
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useThemeToggle } from '../../Theme/ThemeProviderWrapper';
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../Theme/ThemeReducers/ThemeSlice';

const Header = () => {
    const selectedTheme = useSelector((state) => state.themes.themeMod)
    const { mode, toggleTheme } = useThemeToggle();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sync your theme with the context if needed
    useEffect(() => {
        if (selectedTheme !== mode) {
            toggleTheme();
        }
    }, [selectedTheme, mode]);

    const handleTheme = () => {
        const newTheme = selectedTheme === 'dark' ? 'light' : 'dark';
        dispatch(setTheme(newTheme));
    };

    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>
                {/* Left Side (Logo or Menu) */}
                {isMobile ? (
                    <Typography variant="h6" sx={{ fontWeight: 600, paddingLeft: "7px" }}>
                        StayEase
                    </Typography>
                ) : (
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        StayEase
                    </Typography>
                )}

                {/* Center Nav Items */}
                {/* {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit">Home</Button>
                        <Button color="inherit">Hotels</Button>
                        <Button color="inherit">Rooms</Button>
                        <Button color="inherit">Contact</Button>
                    </Box>
                )} */}

                {/* Right Side (Theme toggle and actions) */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={mode === 'dark' ? "Light Mode" : "Dark Mode"} >
                        <IconButton onClick={handleTheme} color="inherit" >
                            {mode === 'dark' ? <LightModeIcon titleAccess="" /> : <ModeNightIcon titleAccess="" />}
                        </IconButton>
                    </Tooltip>
                    <Button variant="outlined" size="small">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
