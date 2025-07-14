import { createContext, useContext, useReducer, ReactNode } from 'react';
import { InitialStateType, ThemeAction, ThemeMode } from './types';

const initialState: InitialStateType = {
    theme: 'system',
};

const reducer = (state: InitialStateType, action: ThemeAction): InitialStateType => {
    switch (action.type) {
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};

type GlobalContextType = {
    state: InitialStateType;
    setTheme: (theme: ThemeMode) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


type GlobalContextProviderProps = {
    children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setTheme = (theme: ThemeMode) => {
        dispatch({ type: 'SET_THEME', payload: theme });
    };

    return (
        <GlobalContext.Provider value={{ state, setTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};
