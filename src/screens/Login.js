import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import Alert from '@mui/material/Alert';


const Login = ({callback}) => {
    var [ credentials, setCredentials ] = useState({username: "", password: ""});
    var [ postResponse, setPostResponse ] = useState(null);

    const navigate = useNavigate();


    const EfetuaLogin = async (dados) => {
        const url = 'https://backend-aula.vercel.app/app/login';

        let data = {
            usuario: credentials.username,
            senha: credentials.password,
        }

        await axios.post(url, data)
        .then(async (response) => {
            if (response.data.hasOwnProperty('token')) {
                localStorage.setItem("TOKEN", response.data.token);
                callback(true);
                navigate('/dashboard')
                return;
            } else {
                setPostResponse(response.data.erro)
            }
        });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
                    <Stack
                        component="form"
                        sx={{ width: '25ch', marginLeft: '30%' }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        {postResponse && <Alert severity="error">{postResponse}.</Alert>}
                        <TextField id="outlined-basic" variant="filled" color="primary" label="RA" focused
                            value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                        <TextField id="outlined-basic" label="Senha" variant="filled" color="primary" focused type="password"
                            value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                        <Button variant="contained" color="warning" onClick={() => {EfetuaLogin()}}>Login</Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Não é registrado?{' '}
                            <span>
                            <Link
                                href="/registrar"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Registrar
                            </Link>
                            </span>
                        </Typography>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Login