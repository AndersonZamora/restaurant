import { useContext } from 'react';
import { IEntrada } from '../interface';
import { cincout } from '../api';
import { UiContext } from '../context';
import { errorAlert } from '../alerts';

export const useEntrada = () => {

    const { mActive, mEdit, loaderEn, mEntrada, lentradas, modalActive, setData } = useContext(UiContext);

    const getListIEntradas = async () => {

        modalActive(false, 'lent');
        try {
            const { data } = await cincout({
                url: '/admin/entrada',
                method: 'GET'
            });

            const listEntradas = data as IEntrada[];

            setData(listEntradas, 'lsent');
            modalActive(true, 'lent');
        } catch (error) {
            setData([], 'lsent');
            modalActive(true, 'lent');
        }
    }
    const getListEn = async () => {

        modalActive(false, 'lent');
        try {
            const { data } = await cincout({
                url: '/entrada',
                method: 'GET'
            });

            const listEntradas = data as IEntrada[];

            setData(listEntradas, 'lsent');
            modalActive(true, 'lent');
        } catch (error) {
            setData([], 'lsent');
            modalActive(true, 'lent');
        }
    }

    const createIEntrada = async (menu: IEntrada) => {
        try {

            const { data } = await cincout({
                url: '/admin/entrada',
                method: 'POST',
                data: { ...menu }
            });

            const listEntradas = data as IEntrada[];
            setData(listEntradas, 'lsent');
        } catch (error) {
            modalActive(false, 'madd');
            modalActive(false, 'lent');
            errorAlert('Ocurrió un error, no se logró guardar, contacte con CinCout');
        }
    }

    const deleteIEntrada = async (_id: string) => {
        try {

            const { data } = await cincout({
                url: `/admin/entrada/?id=${_id}`,
                method: 'DELETE'
            });

            const listIEntradas = data as IEntrada[];
            setData(listIEntradas, 'lsent');
        } catch (error) {
            modalActive(false, 'madd');
            modalActive(false, 'lent');
            errorAlert('Ocurrió un error, no se logró guardar, contacte con CinCout');
        }
    }

    const updateIEntrada = async (menu: IEntrada) => {
        try {

            const { data } = await cincout({
                url: '/admin/entrada',
                method: 'PUT',
                data: { ...menu }
            });

            const listEntradas = data as IEntrada[];
            setData(listEntradas, 'lsent');
        } catch (error) {
            modalActive(false, 'madd');
            modalActive(false, 'lent');
            errorAlert('Ocurrió un error, no se logró guardar, contacte con CinCout');
        }
    }

    return {
        getListIEntradas,
        getListEn,
        createIEntrada,
        deleteIEntrada,
        updateIEntrada,
        modalActive,
        setData,
        lentradas,
        loaderEn,
        mActive,
        mEdit,
        mEntrada,
    }
}