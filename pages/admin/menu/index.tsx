import { useRouter } from 'next/router';
import { useMenu } from '../../../hooks';
import { useEffect } from 'react';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { Badge, Button, IconButton } from '@mui/material';
import { BoardMenu } from '../../../components';
import { Backdrop, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MenuPage = () => {

    const { loaderCr, lcriollos, mActive, mEdit, mCriollo, getListcriollos, createCriollo, deleteCriollo, updateCriollo, modalActive, setData } = useMenu();

    const router = useRouter();

    const handlerRouter = (ruta: string) => {
        router.push(`${ruta}`);
    }

    useEffect(() => {
        if (!loaderCr) {
            getListcriollos();
        }
    }, [loaderCr])


    return (
        <AdminLayout title={'Menú'}>
            <br />
            <Button color='secondary' onClick={() => handlerRouter('/admin')}>ir a inicio</Button>
            <br />
            {
                loaderCr ? (
                    <>
                        <BoardMenu
                            criollos={lcriollos}
                            handleVisible={modalActive}
                            visible={mActive}
                            visibleEd={mEdit}
                            setData={setData}
                            model={mCriollo}
                            handleRegister={createCriollo}
                            hanldeDelete={deleteCriollo}
                            handleUpdate={updateCriollo}
                        />
                        <IconButton className='fab' onClick={() => modalActive(true, 'madd')}>
                            <Badge color="secondary">
                                <AddIcon sx={{ fontSize: 40 }} color='success' />
                            </Badge>
                        </IconButton>
                    </>
                ) :
                    (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={!loaderCr}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )
            }
        </AdminLayout >
    )
}

export default MenuPage