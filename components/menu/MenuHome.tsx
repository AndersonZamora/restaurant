import { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { ItemMenu } from './ItemMenu';
import { ItemEntrada } from './ItemEntrada';
import { useEntrada, useMenu } from '../../hooks';

export const MenuHome = () => {

    const { getListEn, loaderEn, lentradas } = useEntrada();
    const { getListCr, loaderCr, lcriollos } = useMenu();

    useEffect(() => {
        getListEn();
        getListCr();
    }, [])

    return (
        <Grid container justifyContent='center'>
            <Grid item md={12}>
                <Typography className='title-carta'>Menú Criollo</Typography>
                <Typography className='subtitle-1'>Disfruta de la Gastronomia local</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} container className='menu-container'>
                <Grid item xs={12} md={12}>
                    <Typography className='item-title-1'>Entrada</Typography>
                    {
                        loaderEn ?
                            (
                                <>
                                    {lentradas.map(com => (
                                        <ItemEntrada
                                            key={com._id}
                                            entrada={com}
                                        />
                                    ))}
                                </>
                            ) : (
                                <CircularProgress color="inherit" />
                            )

                    }
                    <Typography className='item-title-1'>Segundos</Typography>
                    {
                        loaderCr ?
                            (
                                <>
                                    {lcriollos.map(com => (
                                        <ItemMenu
                                            key={com._id}
                                            menu={com}
                                        />
                                    ))}
                                </>
                            ) : (
                                <CircularProgress color="inherit" />
                            )
                    }

                </Grid>
            </Grid>
        </Grid>
    )
}
