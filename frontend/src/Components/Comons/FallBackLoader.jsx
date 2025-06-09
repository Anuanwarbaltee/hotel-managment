import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const FallbackLoader = ({ message = 'Loading...' }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                color: 'text.primary',
                gap: 2,
            }}
        >
            <CircularProgress color="primary" size={48} />
            <Typography variant="body1">{message}</Typography>
        </Box>
    );
};

export default FallbackLoader;
