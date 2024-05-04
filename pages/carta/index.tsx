import { Badge, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { ChozaLayout } from '../../components/ChozaLayout';
import { CartaMenu } from '../../components';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from 'next/link';
const CartaPage = () => {
    return (
        <ChozaLayout
            title={'Carta - Choza norteña'}
            pageDescription={'Didisfruta de las comidas criollas son el sabor auténtico de la tradición, un festín que une generaciones en cada bocado'}
            imageFullUrl={'choza1.jpg'}
        >
            <Toolbar>
                <Container sx={{ mb: 5, mt: 2 }} className='animate__animated animate__fadeIn'>
                    <CartaMenu />
                    <Link href='http://wa.me/51902280814?' target='_blank' className='fab '>
                        <IconButton>
                            <Badge color="secondary">
                                <WhatsAppIcon sx={{ fontSize: 40 }} color='success' />
                            </Badge>
                        </IconButton>
                    </Link>
                </Container>
            </Toolbar>
        </ChozaLayout>
    )
}

export default CartaPage;
