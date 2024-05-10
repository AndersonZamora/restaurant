import { useContext } from 'react';
import { ICriollo } from '../interface';
import { cincout } from '../api';
import { UiContext } from '../context/';
import { errorAlert } from '../alerts';

export const useMenu = () => {

    const { mActive, mEdit, loaderCr, mCriollo, lcriollos, modalActive, setData } = useContext(UiContext);

    const getListcriollos = async () => {

        modalActive(false, 'lcri');

        try {
            const { data } = await cincout({
                url: '/admin/menu',
                method: 'GET'
            });

            const listcriollos = data as ICriollo[];

            setData(listcriollos, 'lscri');
            modalActive(true, 'lcri');
        } catch (error) {
            setData([], 'lscri');
            modalActive(true, 'lcri');
        }
    }

    const getListCr = async () => {

        modalActive(false, 'lcri');

        try {
            const { data } = await cincout({
                url: '/menu',
                method: 'GET'
            });

            const listcriollos = data as ICriollo[];

            setData(listcriollos, 'lscri');
            modalActive(true, 'lcri');
        } catch (error) {
            setData([], 'lscri');
            modalActive(true, 'lcri');
        }
    }

    const createCriollo = async (menu: ICriollo) => {
        try {

            const { data } = await cincout({
                url: '/admin/menu',
                method: 'POST',
                data: { ...menu }
            });

            const listcriollos = data as ICriollo[];
            setData(listcriollos, 'lscri');
        } catch (error) {
            modalActive(false, 'madd');
            modalActive(false, 'lcri');
            errorAlert('Ocurrió un error, no se logró guardar, contacte con CinCout');
        }
    }

    const deleteCriollo = async (_id: string) => {
        try {

            const { data } = await cincout({
                url: `/admin/menu/?id=${_id}`,
                method: 'DELETE'
            });

            const listcriollos = data as ICriollo[];
            setData(listcriollos, 'lscri');
        } catch (error) {
            modalActive(false, 'madd');
            modalActive(false, 'lcri');
            errorAlert('Ocurrió un error, no se logró guardar, contacte con CinCout');
        }
    }

    const updateCriollo = async (menu: ICriollo) => {
        try {

            const { data } = await cincout({
                url: '/admin/menu',
                method: 'PUT',
                data: { ...menu }
            });

            const listcriollos = data as ICriollo[];
            setData(listcriollos, 'lscri');
        } catch (error) {
            modalActive(false, 'madd');
            modalActive(false, 'lcri');
            errorAlert('Ocurrió un error, no se logró guardar, contacte con CinCout');
        }
    }

    return {
        getListcriollos,
        getListCr,
        createCriollo,
        deleteCriollo,
        updateCriollo,
        modalActive,
        setData,
        lcriollos,
        loaderCr,
        mActive,
        mEdit,
        mCriollo,
    }
}