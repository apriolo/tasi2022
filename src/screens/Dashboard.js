import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Dashboard = ({callback}) => {

    var [ searchText, setSearchText ] = useState("");

    var [ foundedItens, setFoundedItens ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        buscarItens()
    }, [])

    const buscarItens = async () => {
        var auth = localStorage.getItem("TOKEN");
        let url = 'https://backend-aula.vercel.app/app/produtos';

        if (searchText) {
            url = url + '/' + searchText;
        }

        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };

        await axios.get(url, config)
        .then(async (response) => {
            console.log('buscando produtos')
            console.log(response)
            setFoundedItens(response.data)
        });
    };
    
    const Logout = () => {
        localStorage.removeItem("TOKEN");
        callback("false")
    }

    const goToNewProduct = () => {
        navigate('/cadastrar')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', bgcolor: '#fffff', height: '100vh', alignItems: 'top' }}>
                    <Stack
                        component="form"
                        sx={{ width: '50ch', marginLeft: '10%', marginTop: '5%' }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" variant="filled" color="secondary" label="Nome do Personagem" focused
                            value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <Button variant="contained" color="primary" onClick={() => {buscarItens()}}>Buscar Produto</Button>
                        <Button variant="contained" color="secondary" onClick={() => {goToNewProduct()}}>Cadastrar Produto</Button>
                        <Button variant="contained" color="error" onClick={() => {Logout()}}>Sair</Button>

                        <Grid container>
                            {foundedItens.length > 0 && (
                                foundedItens.map((item, key) => (
                                    <ProductCard produto={item}/>
                                ))
                            )}
                        </Grid>

                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Dashboard