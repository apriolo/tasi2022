import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Alert from '@mui/material/Alert';


const Register = () => {
    var [ credentials, setCredentials ] = useState({username: "", password: "", confirm: ""});
    var [ postResponse, setPostResponse ] = useState(null);
    var [ postResponseSuccess, setPostResponseSuccess ] = useState(null);


    useEffect(() => {
    }, [postResponse])

    const navigate = useNavigate();

    const registrar = async () => {
        const url = 'https://backend-aula.vercel.app/app/registrar';

        let data = {
            usuario: credentials.username,
            senha: credentials.password,
            confirma: credentials.confirm
        }
        await axios.post(url, data)
        .then(async (response) => {
            if (response.data.hasOwnProperty('_id')) {
                console.log('sucesso');
                console.log(response.data);
                setPostResponseSuccess(true)
                navigate('/login')
            } else {
                console.log('error');
                console.log(response.data.erro);
                setPostResponse(response.data.erro)
            }
        });
    };

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
                        {postResponseSuccess && <Alert severity="success">Usuario Criado com Sucesso!.</Alert>}
                        <TextField id="outlined-basic" variant="filled" color="primary" label="RA" focused
                            value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                        <TextField id="outlined-basic" label="Senha" variant="filled" color="primary" focused type="password"
                            value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                        <TextField id="outlined-basic" label="Senha" variant="filled" color="primary" focused type="password"
                            value={credentials.confirm} onChange={(e) => setCredentials({...credentials, confirm: e.target.value})}/>
                        <Button variant="contained" color="warning" onClick={() => {registrar()}}>Registrar</Button>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Register