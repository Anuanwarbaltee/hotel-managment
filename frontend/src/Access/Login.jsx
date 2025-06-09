import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    Paper,
    Link,
    useTheme,
} from '@mui/material';
import { getCustomStyles } from '../Utils/CustomStyle';

const LoginForm = () => {
    const theme = useTheme();
    const styles = getCustomStyles(theme);

    return (
        <Box sx={styles.pageWrapper}>
            <Paper elevation={4} sx={styles.formContainer}>
                <Typography variant="h5" sx={styles.title}>
                    Login to StayEase
                </Typography>

                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        sx={styles.textField}
                        size='small'
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        sx={styles.textField}
                        size='small'
                    />

                    {/* <Box sx={styles.actionRow}>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Link href="#" underline="hover" variant="body2">
                            Forgot password?
                        </Link>
                    </Box> */}

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={styles.submitButton}
                    >
                        Login
                    </Button>
                    <Box sx={styles.actionRow}>

                        <Typography sx={{ display: "flex", gap: 1 }} variant='body1'>Dont't have an account?
                            <Link href="#" underline="hover" variant="body1">
                                Sign Up
                            </Link>
                        </Typography>

                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginForm;
