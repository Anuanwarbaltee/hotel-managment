// src/Pages/NotFound.jsx
import { Box, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                404
            </Typography>
            <Typography variant="h5">Page Not Found</Typography>
        </Box>
    );
};

export default NotFound;
