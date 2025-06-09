import React, { useState } from 'react';

// Custom hook to manage date picker state and behavior
const useDatePicker = (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return { value, setValue, anchorEl, setAnchorEl, handleOpen, handleClose };
};

export default useDatePicker