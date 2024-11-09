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
import { useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UpdateProduct = () => {
    var [ product, setProduct ] = useState({name: "", quantity: "", price: "", description: "", image: "", _id: ""});
    var [ postResponse, setPostResponse ] = useState(null);
    var [ postResponseSuccess, setPostResponseSuccess ] = useState(null);
    const { state } = useLocation();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setProduct(
            {
                _id: state?.produto._id,
                name: state?.produto.nome,
                quantity: state?.produto.quantidade,
                price: state?.produto.preco,
                description: state?.produto.descricao,
                image: state?.produto.imagem
            }
        )
    }, [state])
    

    const navigate = useNavigate();

    const alterarProduto = async () => {
        const url = 'https://backend-aula.vercel.app/app/produtos';
        var auth = localStorage.getItem("TOKEN");
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };

        let data = {
            id: product._id,
            nome: product.name,
            quantidade: product.quantity,
            preco: product.price,
            descricao: product.description,
            imagem: product.image
        }
        
        await axios.put(url, data, config)
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

    
    const deleteProduto = async () => {
        const url = 'https://backend-aula.vercel.app/app/produtos';
        var auth = localStorage.getItem("TOKEN");
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };

        let data = {
            id: product._id
        }
        
        await axios.delete(url,
            {
                headers: config,
                data: data
            }
        )
        .then(async (response) => {
            console.log(response)
            if (response.data.hasOwnProperty('acknowledged')) {
                setOpen(false);
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
                        
                        <Button variant="contained" color="warning" onClick={() => {alterarProduto()}}>Alterar Produto</Button>
                        <Button variant="contained" color="error" onClick={handleClickOpen}>Excluir Produto</Button>
                        <Button variant="contained" color="secondary" onClick={() => {navigate('/dashboard')}}>Voltar</Button>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"EXCLUIR PRODUTO"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem Certeza que deseja excluir o produto?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="secondary">Cancelar</Button>
                            <Button onClick={deleteProduto} variant="contained" color="error" autoFocus>
                                EXCLUIR
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default UpdateProduct