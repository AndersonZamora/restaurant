import { FC, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import { Backdrop, Button, CircularProgress, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { daActions, inActions, moActions } from '../../../context';
import { DialogMenu } from './DialogMenu';
import { DialogMenuEdit } from './DialogMenuEdit';
import { ICriollo } from '../../../interface';
import { capi } from '../../../utils';

type Targ = { target: { name: string; value: string } }

type Props = {
    criollos: ICriollo[] | [];
    visible: boolean;
    visibleEd: boolean
    model: ICriollo | undefined
    handleVisible: (active: boolean, tipo: moActions) => void;
    setData: (data: inActions, tipo: daActions) => void;
    handleRegister: (menu: ICriollo) => Promise<void>
    hanldeDelete: (_id: string) => Promise<void>
    handleUpdate: (menu: ICriollo) => Promise<void>
}

export const BoardMenu: FC<Props> = ({ criollos, visible, visibleEd, model, handleVisible, handleRegister, hanldeDelete, setData, handleUpdate }) => {

    const [filters, setFilters] = useState({ global: { value: '', matchMode: FilterMatchMode.CONTAINS }, });
    const [rows, setRows] = useState<ICriollo[]>([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (criollos.length > 0) {
            const rows: ICriollo[] = criollos!.map(order => ({
                _id: order._id,
                name: `${capi(order.name)}`,
                price: `S/${order.price}.00`,
                description: order.description
            }));
            setRows(rows)
        }
    }, [criollos]);

    const onInputSer = ({ target }: Targ) => {
        setFilters({
            global: { value: target.value, matchMode: FilterMatchMode.CONTAINS }
        })
    }

    const handleDelete = (_id: string) => {
        Swal.fire({
            title: "Estas segura?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true);
                await hanldeDelete(_id);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El menú se ha eliminado",
                    icon: "success"
                });
            }
        });
    }

    const handleRegistro = (model: ICriollo) => {
        setLoader(true);
        handleRegister(model);
    }

    const setEdit = (data: ICriollo) => {
        const newPrice1 = data?.price.replace('S/', '');
        const newPrice2 = newPrice1.replace('.00', '');
        setData({ ...data, price: newPrice2 }, 'cri');
        handleVisible(true, 'medit');
    }

    const handleEdit = (model: ICriollo) => {
        setLoader(true);
        handleUpdate(model);
    }

    useEffect(() => {
        handleVisible(false, 'madd');
        handleVisible(false, 'medit');
        setLoader(false);
    }, [criollos]);

    const actionTemplate = (data: ICriollo) => {
        return (
            <div className="flex flex-wrap gap-2">

                <Button
                    onClick={() => handleDelete(data._id)}
                    color='success'
                    startIcon={<RemoveRedEyeIcon />}
                >Eliminar</Button>
                |
                <Button
                    onClick={() => setEdit(data)}
                    color='warning'
                    startIcon={<EditIcon />}
                >Editar</Button>
            </div>
        );
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='justify-content-sear'>
                <InputText
                    placeholder='Buscar'
                    onChange={onInputSer}
                />
            </div>

            <Divider sx={{ my: 1 }} />
            <DataTable
                value={rows}
                filters={filters}
                paginator
                rows={5}
            >
                <Column className='active' field='name' header="Menú" sortable />
                <Column field='price' header="Precio" sortable />
                <Column field='description' header="Descripción" sortable />
                <Column header="Acciones" body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
            <DialogMenu
                handleRegistro={handleRegistro}
                handleVisible={() => handleVisible(false, 'madd')}
                visible={visible} />

            <DialogMenuEdit
                handleEdit={handleEdit}
                model={model}
                visible={visibleEd}
                handleVisible={() => handleVisible(false, 'medit')}
            />
        </>

    )
}
