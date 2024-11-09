import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ produto }) => {
    const urlImg = `${produto.imagem}`;
    const navigate = useNavigate();

    const editarProduto = (id) => {
        console.log(id)
        navigate(`/editar/${id}`, {state: {produto}})
    }

    return(
        <Card sx={{width: 200, marginInline: 1 }} onClick={() => editarProduto(produto.nome)}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={urlImg}
                alt=""
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {produto.nome}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {produto.descricao}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Quantidade: {produto.quantidade}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Preço {produto.preco}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductCard