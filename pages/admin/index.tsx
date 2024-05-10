import { useRouter } from 'next/router';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Grid } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { CardItems } from '../../components/';

const AdminPage = () => {

    const router = useRouter();

    const handlerRouter = (ruta: string) => {
        router.push(`${ruta}`);
    }

    return (
        <AdminLayout title={'Inicio'}>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} sx={{ cursor: 'pointer' }} onClick={() => handlerRouter('/admin/entrada')}>
                    <CardItems title={'Entradas'} color={'#121212'} icon={<RestaurantIcon sx={{ fontSize: '35px' }} />} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ cursor: 'pointer' }} onClick={() => handlerRouter('/admin/menu')}>
                    <CardItems title={'Menú'} color={'#121212'} icon={<DinnerDiningIcon sx={{ fontSize: '35px' }} />} />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default AdminPage;