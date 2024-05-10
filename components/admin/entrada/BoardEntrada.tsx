import { FC, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { IEntrada } from '../../../interface';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import { Backdrop, Button, CircularProgress, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { daActions, inActions, moActions } from '../../../context';
import { DialogEntrada } from './DialogEntrada';
import { DialogEntradaEdit } from './DialogEntradaEdit';
import { capi } from '../../../utils';

type Targ = { target: { name: string; value: string } }

type Props = {
    entradas: IEntrada[] | [];
    visible: boolean;
    visibleEd: boolean
    model: IEntrada | undefined
    handleVisible: (active: boolean, tipo: moActions) => void;
    setData: (data: inActions, tipo: daActions) => void;
    handleRegister: (menu: IEntrada) => Promise<void>
    hanldeDelete: (_id: string) => Promise<void>
    handleUpdate: (menu: IEntrada) => Promise<void>
}

export const BoardEntrada: FC<Props> = ({ entradas, visible, visibleEd, model, handleVisible, handleRegister, hanldeDelete, setData, handleUpdate }) => {

    const [filters, setFilters] = useState({ global: { value: '', matchMode: FilterMatchMode.CONTAINS }, });
    const [rows, setRows] = useState<IEntrada[]>([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (entradas.length > 0) {
            const rows: IEntrada[] = entradas!.map(order => ({
                _id: order._id,
                name: `${capi(order.name)}`
            }));
            setRows(rows)
        }
    }, [entradas]);

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
                    text: "La entrada ha sido eliminada",
                    icon: "success"
                });
            }
        });
    }

    const handleRegistro = (model: IEntrada) => {
        setLoader(true);
        handleRegister(model);
    }

    const setEdit = (data: IEntrada) => {
        setData({ ...data }, 'ent');
        handleVisible(true, 'medit');
    }

    const actionTemplate = (data: IEntrada) => {
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

    const handleEdit = (model: IEntrada) => {
        setLoader(true);
        handleUpdate(model);
    }

    useEffect(() => {
        handleVisible(false, 'madd');
        handleVisible(false, 'medit');
        setLoader(false);
    }, [entradas]);

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
                <Column className='active' field='name' header="Entrada" sortable />
                <Column header="Acciones" body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
            <DialogEntrada
                handleRegistro={handleRegistro}
                handleVisible={() => handleVisible(false, 'madd')}
                visible={visible} />

            <DialogEntradaEdit
                handleEdit={handleEdit}
                model={model}
                visible={visibleEd}
                handleVisible={() => handleVisible(false, 'medit')}
            />
        </>
    )
}
