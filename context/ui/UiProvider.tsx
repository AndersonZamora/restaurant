import { FC, useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UiContext, daActions, inActions, moActions } from './UiContext';
import { ICriollo, IEntrada } from '../../interface';

export interface UiState {
    mActive: boolean;
    mEdit: boolean;
    loaderEn: boolean;
    loaderCr: boolean;
    mEntrada: IEntrada | undefined;
    mCriollo: ICriollo | undefined;
    lentradas: IEntrada[];
    lcriollos: ICriollo[];
}

const UI_INITIAL_STATE: UiState = {
    mActive: false,
    mEdit: false,
    loaderEn: false,
    loaderCr: false,
    mEntrada: undefined,
    mCriollo: undefined,
    lentradas: [],
    lcriollos: [],
}

interface Props {
    children: any
}

export const UiProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const modalActive = (active: boolean, tipo: moActions) => {
        switch (tipo) {
            case 'madd': { dispatch({ type: '[UI] - Add modal', payload: active }); return; }
            case 'medit': { dispatch({ type: '[UI] - Edit modal', payload: active }); return; }
            case 'lent': { dispatch({ type: '[UI] - Loaders entradas', payload: active }); return; }
            case 'lcri': { dispatch({ type: '[UI] - Loaders criollos', payload: active }); return; }
            default: return;
        }
    }

    const setData = (data: inActions, tipo: daActions) => {
        switch (tipo) {
            case 'ent': { dispatch({ type: '[UI] - Set entrada', payload: data as IEntrada }); return; }
            case 'cri': { dispatch({ type: '[UI] - Set criollo', payload: data as ICriollo }); return; }
            case 'lsent': { dispatch({ type: '[UI] - Set entradas', payload: data as IEntrada[] }); return; }
            case 'lscri': { dispatch({ type: '[UI] - Set criollos', payload: data as ICriollo[] }); return; }
            default: return;
        }
    }

    return (
        < UiContext.Provider value={{
            ...state,
            modalActive,
            setData,
        }}>
            {children}
        </ UiContext.Provider>
    )
};
