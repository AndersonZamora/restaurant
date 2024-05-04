import { Grid, Typography } from '@mui/material';
import { ICriollo } from '../../interface';
import { ItemMenu } from './ItemMenu';

const comidas: ICriollo[] = [
    {
        _id: '1',
        name: 'Cabrito norteño',
        price: '15',
        description: 'Ceviche o sopa',
    },
    {
        _id: '2',
        name: 'Cau cau',
        price: '13',
        description: 'Ceviche o sopa',
    },
    {
        _id: '3',
        name: 'Pollo a la olla',
        price: '13',
        description: 'Ceviche o sopa',
    },
    {
        _id: '4',
        name: 'Pescado frito',
        price: '13',
        description: 'Ceviche o sopa',
    },
    {
        _id: '5',
        name: 'Lomo salto',
        price: '19',
        description: 'Ceviche o sopa',
    },
    {
        _id: '6',
        name: 'Bistec a lo pobre',
        price: '19',
        description: 'Ceviche o sopa',
    },
    {
        _id: '7',
        name: 'Arroz con mariscos',
        price: '19',
        description: 'Ceviche',
    },
    {
        _id: '8',
        name: 'Chaufa de mariscos',
        price: '19',
        description: 'Ceviche',
    },
]

export const CartaMenu = () => {
    return (
        <Grid container justifyContent='center'>
            <Grid item md={12}>
                <Typography className='title-carta'>Menu Criollo</Typography>
                <Typography className='subtitle-1'>Disfruta de la Gastronomia local</Typography>
            </Grid>
            <Grid item md={8} container className='menu-container'>
                <Grid item xs={12} md={12}>
                    {
                        comidas.map(com => (
                            <ItemMenu
                                key={com._id}
                                menu={com}
                            />
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}
