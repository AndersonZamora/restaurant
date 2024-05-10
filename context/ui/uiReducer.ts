import { ICriollo, IEntrada } from '../../interface';
import { UiState } from './UiProvider';

type UiActionType =
    | { type: '[UI] - Add modal', payload: boolean }
    | { type: '[UI] - Edit modal', payload: boolean }
    | { type: '[UI] - Loaders entradas', payload: boolean }
    | { type: '[UI] - Loaders criollos', payload: boolean }
    | { type: '[UI] - Set entrada', payload: IEntrada | undefined }
    | { type: '[UI] - Set criollo', payload: ICriollo | undefined }
    | { type: '[UI] - Set entradas', payload: IEntrada[] | [] }
    | { type: '[UI] - Set criollos', payload: ICriollo[] | [] }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch (action.type) {
        case '[UI] - Add modal':
            return {
                ...state,
                mActive: action.payload
            }
        case '[UI] - Edit modal':
            return {
                ...state,
                mEdit: action.payload
            }
        case '[UI] - Loaders entradas':
            return {
                ...state,
                loaderEn: action.payload
            }
        case '[UI] - Loaders criollos':
            return {
                ...state,
                loaderCr: action.payload
            }
        case '[UI] - Set entrada':
            return {
                ...state,
                mEntrada: action.payload
            }
        case '[UI] - Set criollo':
            return {
                ...state,
                mCriollo: action.payload
            }
        case '[UI] - Set entradas':
            return {
                ...state,
                lentradas: action.payload
            }
        case '[UI] - Set criollos':
            return {
                ...state,
                lcriollos: action.payload
            }
        default:
            return state;
    }
}
