import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { useRouter } from 'next/router';
import { Backdrop, Badge, Button, CircularProgress, IconButton } from '@mui/material';
import { useEntrada } from '../../../hooks';
import { BoardEntrada } from '../../../components';
import AddIcon from '@mui/icons-material/Add';

const EntradaPage = () => {

    const { loaderEn, lentradas, mActive, mEdit, mEntrada, getListIEntradas, createIEntrada, deleteIEntrada, updateIEntrada, modalActive, setData } = useEntrada();
    const router = useRouter();

    const handlerRouter = (ruta: string) => {
        router.push(`${ruta}`);
    }

    useEffect(() => {
        if (!loaderEn) {
            getListIEntradas();
        }
    }, [loaderEn])


    return (
        <AdminLayout title={'Entrada'}>
            <br />
            <Button color='secondary' onClick={() => handlerRouter('/admin')}>ir a inicio</Button>
            <br />
            {
                loaderEn ? (
                    <>
                        <BoardEntrada
                            entradas={lentradas}
                            handleVisible={modalActive}
                            visible={mActive}
                            visibleEd={mEdit}
                            setData={setData}
                            model={mEntrada}
                            handleRegister={createIEntrada}
                            hanldeDelete={deleteIEntrada}
                            handleUpdate={updateIEntrada}
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
                            open={!loaderEn}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )
            }
        </AdminLayout>
    )
}

export default EntradaPage