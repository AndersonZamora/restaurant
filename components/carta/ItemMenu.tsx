import { ICriollo } from '../../interface';
import { Divider, Grid, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
    menu: ICriollo;
}

export const ItemMenu: FC<Props> = ({ menu }) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Typography className='item-title'>{menu.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Typography className='item-title'>{`S/${menu.price}.00`}</Typography>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography className='item-subtitle'>{menu.description}</Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
        </>
    )
}
