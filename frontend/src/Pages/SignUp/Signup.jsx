import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Avatar,
    Grid,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { getCustomStyles } from '../../Utils/CustomStyle'; // Adjust path if needed
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const Signup = () => {
    const theme = useTheme();
    const styles = getCustomStyles(theme);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userName: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfPassword, setShowConfPassword] = React.useState(false);

    const handleClickShowPassword = (type) => {
        if (type === "password") {
            setShowPassword((show) => !show);
        }
        if (type === "confpassword") {
            setShowConfPassword((show) => !show);
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (field) => (event) => {
        setForm({ ...form, [field]: event.target.value });
    };

    const validate = () => {
        if (!form.username || !form.email || !form.phone || !form.password || !form.confirmPassword) {
            setError('Please fill out all fields.');
            return false;
        }
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        setError('');
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            username: form.userName,
            email: form.email,
            phone: form.phone,
            avatar: form.avatar || 'https://via.placeholder.com/150',
            password: form.password,
            role: 'user',
        };

        try {
            const res = await axios.post('/api/signup', payload); // Update API endpoint
            console.log('Signup successful:', res.data);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (

        <Box sx={styles.pageWrapper}>
            <Paper elevation={4} sx={styles.formContainer}>
                <Typography variant="h5" sx={styles.title}>
                    Create an Account
                </Typography>

                <Grid container spacing={2}>
                    {/* Avatar Preview */}
                    {form.avatar && (
                        <Grid xs={12} container justifyContent="center">
                            <Avatar alt="User Avatar" src={form.avatar} sx={styles.avatar} />
                        </Grid>
                    )}
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid container item xs={12} md={6} alignItems="center" spacing={2} >
                        <Grid item xs={12} md={4}>Full Name</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                sx={styles.textField}
                                value={form.fullName}
                                onChange={handleChange('fullName')}
                                size='small'
                                placeholder='Enter Full Name'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>User Name</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                sx={styles.textField}
                                value={form.userName}
                                onChange={handleChange('userName')}
                                size='small'
                                placeholder='Enter User Name'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>Password</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                sx={styles.textField}
                                value={form.password}
                                onChange={handleChange('password')}
                                size='small'
                                placeholder='Enter Password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                onClick={() => handleClickShowPassword("password")}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>Role</Grid>
                        <Grid item xs={12} md={8}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={form.role}
                                    name="role"
                                    onChange={handleChange('role')}
                                    displayEmpty
                                >
                                    <MenuItem value={""}>Please Select Role</MenuItem>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"owner"}>Owner</MenuItem>
                                    <MenuItem value={"user"}>User</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
                        <Grid item xs={12} md={4}>Email</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                sx={styles.textField}
                                value={form.email}
                                onChange={handleChange('email')}
                                size='small'
                                placeholder='Enter Email'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>Phone</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                sx={styles.textField}
                                value={form.phone}
                                onChange={handleChange('phone')}
                                size='small'
                                placeholder='Enter Phone'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>Confirm Password</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                type={showConfPassword ? "text" : "password"}
                                fullWidth
                                sx={styles.textField}
                                value={form.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                size='small'
                                placeholder='Enter Confirm Password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showConfPassword ? 'hide the password' : 'display the password'}
                                                onClick={() => handleClickShowPassword("confpassword")}
                                                // onMouseDown={handleMouseDownPassword()}
                                                // onMouseUp={handleMouseUpPassword()}
                                                edge="end"
                                            >
                                                {showConfPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>Avatar</Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                variant="outlined"
                                type="file"
                                fullWidth
                                sx={styles.textField}
                                value={form.avatar}
                                onChange={handleChange('confirmPassword')}
                                size='small'
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center", // vertically aligns items
                        justifyContent: "flex-start", // aligns horizontally to the left
                        gap: 2, // spacing between button and text
                        flexWrap: { xs: "wrap", sm: "nowrap" }, // wrap on mobile, inline on desktop
                        mt: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: '36px' }} // match text height if needed
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>

                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        Already have an account?
                        <Link href="#" underline="hover" variant="body1">
                            SignUp
                        </Link>
                    </Typography>
                </Box>


            </Paper>
        </Box>


    );
};

export default Signup;
