import { Badge, Container, IconButton, Toolbar } from '@mui/material';
import { ChozaLayout } from '../../components/ChozaLayout';
import { MenuHome } from '../../components';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from 'next/link';

const CartaPage = () => {
    return (
        <ChozaLayout
            title={'Menú - Choza norteña'}
            pageDescription={'Didisfruta de las comidas criollas son el sabor auténtico de la tradición, un festín que une generaciones en cada bocado'}
            imageFullUrl={'choza1.jpg'}
        >
            <Toolbar>
                <Container sx={{ mb: 5, mt: 2 }} className='animate__animated animate__fadeIn'>
                    <MenuHome />
                    <Link href='http://wa.me/51902280814?' target='_blank' className='fab '>
                        <IconButton>
                            <Badge color="secondary">
                                <WhatsAppIcon sx={{ fontSize: 40 }} color='success' />
                            </Badge>
                        </IconButton>
                    </Link>
                </Container>
            </Toolbar>
            <p style={{ color: 'white', textAlign: 'center' }}>© 2024 | cincout.technology@gmail.com </p>
        </ChozaLayout>
    )
}

export default CartaPage;
