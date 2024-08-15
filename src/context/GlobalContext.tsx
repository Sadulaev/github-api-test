import { createContext, ReactNode } from "react";
import { IRepositoryResponse } from "../requests/searchRepositories";

export interface IPortals {
    modal: { render: ReactNode, show: boolean };
    notification: { render: ReactNode, show: boolean };
}

export interface ISearchParams {
    language: string;
    count: number;
    page: number;
    order: 'asc' | 'desc';
}

export interface IGlobalContext {
    git_token: string | null;
    portals: IPortals,
    searchParams: ISearchParams,
    repResponse: IRepositoryResponse | null;
    loading: {
        repsLoading: boolean;
    },
    actions: {
        setRepsLoading: (state: boolean) => void;
        changeReps: (reps: IRepositoryResponse) => void;
        changeSearchParams: (params: Partial<ISearchParams>) => void
        changeModal: (modal: ReactNode) => void;
        changeNotification: (notify: ReactNode) => void;
    }
}

const GlobalContext = createContext<IGlobalContext>({
    portals: {
        modal: { render: null, show: false },
        notification: { render: null, show: false },
    },
    git_token: null,
    searchParams: {
        language: 'Typescript',
        count: 10,
        page: 1,
        order: 'desc',
    },
    repResponse: null,
    loading: {
        repsLoading: false
    },
    actions: {
        setRepsLoading: () => { },
        changeModal: () => { },
        changeNotification: () => { },
        changeSearchParams: () => { },
        changeReps: () => { }
    }
});

export default GlobalContext;
