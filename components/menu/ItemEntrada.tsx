import { FC } from 'react';
import { capi } from '../../utils';
import { IEntrada } from '../../interface';
import { Divider, Grid, Typography } from '@mui/material';

type Props = {
    entrada: IEntrada;
}

export const ItemEntrada: FC<Props> = ({ entrada }) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Typography className='item-title'>{capi(`${entrada.name}`)}</Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
        </>
    )
}
