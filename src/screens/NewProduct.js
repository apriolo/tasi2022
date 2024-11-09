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

const NewProduct = () => {
    var [ product, setProduct ] = useState({name: "", quantity: "", price: "", description: "", image: ""});
    var [ postResponse, setPostResponse ] = useState(null);
    var [ postResponseSuccess, setPostResponseSuccess ] = useState(null);


    useEffect(() => {
    }, [postResponse])

    const navigate = useNavigate();

    const cadastrar = async () => {
        const url = 'https://backend-aula.vercel.app/app/produtos';
        var auth = localStorage.getItem("TOKEN");
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };

        let data = {
            nome: product.name,
            quantidade: product.quantity,
            preco: product.price,
            descricao: product.description,
            imagem: product.image
        }
        
        await axios.post(url, data, config)
        .then(async (response) => {
            console.log(response)
            if (response.data.hasOwnProperty('_id')) {
                console.log('sucesso');
                console.log(response.data);
                setPostResponseSuccess(true)
                navigate('/dashboard')
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
                        {postResponseSuccess && <Alert severity="success">Produto cadastrado com sucesso!</Alert>}

                        <TextField id="outlined-basic" variant="filled" color="primary" label="Nome" focused
                            value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})}/>

                        <TextField id="outlined-basic" label="Quantidade" variant="filled" color="primary" focused
                            value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})}/>
                        
                        <TextField id="outlined-basic" label="Preço" variant="filled" color="primary" focused type="number"
                            value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})}/>
                        
                        <TextField id="outlined-basic" label="Descricao" variant="filled" color="primary" focused
                            value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})}/>
                        
                        <TextField id="outlined-basic" label="Imagem" variant="filled" color="primary" focused
                            value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})}/>
                        
                        <Button variant="contained" color="warning" onClick={() => {cadastrar()}}>Cadastrar Produto</Button>
                        <Button variant="contained" color="secondary" onClick={() => {navigate('/dashboard')}}>Voltar</Button>

                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default NewProduct