import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import SearchBox from '../Components/Comons/SearchBars';

const MainLayout = () => {
    return (
        <Box>
            <SearchBox />
            <Outlet />
        </Box>
    );
};

export default MainLayout;
