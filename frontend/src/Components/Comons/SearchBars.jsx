import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    useMediaQuery,
    Popover,
    Grid,
    useTheme
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import useDatePicker from './DateHooks';
import { useDispatch, useSelector } from 'react-redux';
import { addFilters } from '../../Shell/Reducers/InnerSearch';
import { formatDateForDisplay, formatDateToStore } from '../../Utils/DateUtils';

// Custom day formatter
const customDayOfWeekFormatter = (day) => dayjs(day).format('dd');

// Hide input
const renderCustomInput = (params, onClose) => (
    <TextField
        {...params}
        autoFocus={false}
        onBlur={onClose}
        sx={{ display: 'none' }}
    />
);

const SearchBox = ({ onSearch }) => {
    const filterReduxData = useSelector((state) => state.search.filters);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const checkInPicker = useDatePicker(null);
    const checkOutPicker = useDatePicker(null);
    const [location, setLocation] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (filterReduxData) {
            const { checkIn, checkOut, location } = filterReduxData;
            checkInPicker.setValue(formatDateForDisplay(checkIn));
            checkOutPicker.setValue(formatDateForDisplay(checkOut));
            setLocation(location);
        }
    }, [filterReduxData])

    const handleSearch = () => {
        let data = {
            location,
            checkIn: formatDateToStore(checkInPicker.value),
            checkOut: formatDateToStore(checkOutPicker.value)
        }
        onSearch?.(data);
        dispatch(addFilters(data))
    };

    const handleCheckInChange = (newValue) => {
        checkInPicker.setValue(newValue);
        checkInPicker.handleClose();
    };

    const handleCheckOutChange = (newValue) => {
        if (
            newValue &&
            checkInPicker.value &&
            dayjs(newValue).isAfter(dayjs(checkInPicker.value))
        ) {
            checkOutPicker.setValue(newValue);
        } else {
            checkOutPicker.setValue(newValue);
        }
        checkOutPicker.handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    p: 2,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: theme.shadows[1],
                    border: `1px solid ${theme.palette.divider}`,
                    // maxWidth: '100%',
                    mx: 'auto'
                }}
            >
                <Grid
                    container
                    spacing={2}
                    direction={isMobile ? 'column' : 'row'}
                    alignItems={isMobile ? "stretch" : "center"}
                >
                    <Grid item xs={12} sm={3}>
                        <TextField
                            placeholder="Location"
                            variant="outlined"
                            value={location}
                            size="small"
                            onChange={(e) => setLocation(e.target.value)}
                            fullWidth

                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            placeholder="Check-in"
                            variant="outlined"
                            value={
                                checkInPicker.value
                                    ? dayjs(checkInPicker.value).local().format('ddd DD MMM')
                                    : ''
                            }
                            size="small"
                            onClick={checkInPicker.handleOpen}
                            InputProps={{
                                readOnly: true,
                                endAdornment: <CalendarTodayIcon sx={{ cursor: 'pointer' }} />
                            }}
                            fullWidth

                        />
                        <Popover
                            open={Boolean(checkInPicker.anchorEl)}
                            anchorEl={checkInPicker.anchorEl}
                            onClose={checkInPicker.handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            PaperProps={{
                                sx: {
                                    p: 2,
                                    borderRadius: 1,
                                    backgroundColor: theme.palette.background.default,
                                    boxShadow: theme.shadows[3]
                                }
                            }}
                        >
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                value={checkInPicker.value}
                                onChange={handleCheckInChange}
                                minDate={dayjs()}
                                renderInput={(params) =>
                                    renderCustomInput(params, checkInPicker.handleClose)
                                }
                                dayOfWeekFormatter={customDayOfWeekFormatter}
                            />
                        </Popover>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            placeholder="Check-out"
                            variant="outlined"
                            value={
                                checkOutPicker.value
                                    ? dayjs(checkOutPicker.value).format('ddd DD MMM')
                                    : ''
                            }
                            size="small"
                            onClick={checkOutPicker.handleOpen}
                            InputProps={{
                                readOnly: true,
                                endAdornment: <CalendarTodayIcon sx={{ cursor: 'pointer' }} />
                            }}
                            fullWidth

                        />
                        <Popover
                            open={Boolean(checkOutPicker.anchorEl)}
                            anchorEl={checkOutPicker.anchorEl}
                            onClose={checkOutPicker.handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            PaperProps={{
                                sx: {
                                    p: 2,
                                    borderRadius: 1,
                                    backgroundColor: theme.palette.background.default,
                                    boxShadow: theme.shadows[3]
                                }
                            }}
                        >
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                value={checkOutPicker.value}
                                onChange={handleCheckOutChange}
                                minDate={
                                    checkInPicker.value
                                        ? dayjs(checkInPicker.value).add(1, 'day')
                                        : dayjs()
                                }
                                renderInput={(params) =>
                                    renderCustomInput(params, checkOutPicker.handleClose)
                                }
                                dayOfWeekFormatter={customDayOfWeekFormatter}
                            />
                        </Popover>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            fullWidth
                            sx={{
                                width: '100%',
                                height: '40px',
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
};

export default SearchBox;
