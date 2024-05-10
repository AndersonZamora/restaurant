import { ICriollo, IEntrada } from '../../interface';
import { createContext } from 'react';

export type moActions = 'madd' | 'medit' | 'lent' | 'lcri';
export type daActions = 'ent' | 'cri' | 'lsent' | 'lscri'
export type inActions = ICriollo | ICriollo[] | IEntrada | IEntrada[] | [] | undefined;

interface ContextProps {
    mActive: boolean;
    mEdit: boolean;
    loaderEn: boolean;
    loaderCr: boolean;
    mEntrada: IEntrada | undefined;
    mCriollo: ICriollo | undefined;
    lentradas: IEntrada[] | [];
    lcriollos: ICriollo[] | [];
    modalActive: (active: boolean, tipo: moActions) => void;
    setData: (data: inActions, tipo: daActions) => void;
}

export const UiContext = createContext({} as ContextProps);