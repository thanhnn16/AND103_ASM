import axios from "axios";
import {useState} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import {useRouter} from 'src/routes/hooks';

import {bgGradient} from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
    const theme = useTheme();

    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // eslint-disable-next-line consistent-return
    const handleClick = () => {
        const request = {
            phoneNumber, password
        }
        axios.post('http://localhost:3000/auth/login', request).then((response) => {
            const {data} = response;
            if (data.status === 'not_found') {
                console.log('User not found');
            } else if (data.status === 'invalid') {
                console.log('Invalid password');
            } else if (data.token !== null) {
                console.log('Login success');
                router.push('/');
            } else {
                console.log('Login failed');
            }
        })
    };

    const renderForm = (<>
        <Stack spacing={3}>
            <TextField
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber" label="Số điện thoại"/>
            <TextField
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                        </IconButton>
                    </InputAdornment>),
                }}
            />
        </Stack>
        <Stack marginBottom={3.5}/>
        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleClick}
        >
            Đăng nhập
        </LoadingButton>
    </>);

    return (<Box
        sx={{
            ...bgGradient({
                color: alpha(theme.palette.background.default, 0.9), imgUrl: '/assets/background/overlay_4.jpg',
            }), height: 1,
        }}
    >
        <Logo
            sx={{
                position: 'fixed', top: {xs: 16, md: 24}, left: {xs: 16, md: 24},
            }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{height: 1}}>
            <Card
                sx={{
                    p: 5, width: 1, maxWidth: 420,
                }}
            >
                <Typography marginBottom={4} variant="h5">Đăng nhập - Bông Tuyết Trắng</Typography>
                {renderForm}
            </Card>
        </Stack>
    </Box>);
}
