import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { getCustomStyles } from '../../Utils/CustomStyle'; // Adjust path if needed

const Signup = () => {
    const theme = useTheme();
    const styles = getCustomStyles(theme);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

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
            username: form.username,
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
            <Box sx={styles.formContainer}>
                <Typography variant="h5" sx={styles.title}>
                    Create an Account
                </Typography>

                {form.avatar && (
                    <Avatar
                        alt="User Avatar"
                        src={form.avatar}
                        sx={styles.avatar}
                    />
                )}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    sx={styles.textField}
                    value={form.username}
                    onChange={handleChange('username')}
                    size='small'
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={styles.textField}
                    value={form.email}
                    onChange={handleChange('email')}
                    size='small'
                />

                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    sx={styles.textField}
                    value={form.phone}
                    onChange={handleChange('phone')}
                    size='small'
                />

                <TextField
                    label="Avatar URL (optional)"
                    variant="outlined"
                    fullWidth
                    sx={styles.textField}
                    value={form.avatar}
                    onChange={handleChange('avatar')}
                    size='small'
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    sx={styles.textField}
                    value={form.password}
                    onChange={handleChange('password')}
                    size='small'
                />

                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    sx={styles.textField}
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    size='small'
                />

                {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={styles.submitButton}
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Signup;
