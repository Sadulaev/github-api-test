import { ReactNode, useCallback, useEffect, useState } from 'react'
import Routes from './routes/Routes'
import axios from './utils/axios';
import PortalsContainer from './components/PortalsContainer/PortalsContainer';
import GlobalContext, { ISearchParams } from './context/GlobalContext';
import { IRepositoryResponse } from './requests/searchRepositories';

function App() {
  const [modal, setModal] = useState<{ render: ReactNode, show: boolean }>({ render: null, show: false });
  const [notification, setNotification] = useState<{ render: ReactNode, show: boolean }>({ render: null, show: false });
  const [token, setToken] = useState<string | null>(null)
  const [repResponse, setRepResponse] = useState<IRepositoryResponse | null>(null)
  const [repsLoading, setRepsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    language: 'Typescript',
    count: 12,
    page: 1,
    order: 'desc',
  })

  useEffect(() => {
    if (localStorage.getItem('git_token')) {
      setToken(localStorage.getItem('git_token'))
    } else {
      setToken(import.meta.env.GIT_TOKEN)
    }
  }, [])

  useEffect(() => {
    if (token) {
      const requestInterceptor = axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
      };
    }

  }, [token])

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use((response) => response, (error) => {
      changeNotification(error.response.data?.message || error?.message || 'Unresolved error');
      return Promise.reject(error);
    })

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    }
  }, [setNotification])

  const changeModal = (render: ReactNode) => {
    if (render === null) {
      setModal({ render: modal.render, show: false })
    } else {
      setModal({ render, show: true })
    }
  }

  const changeNotification = (render: ReactNode) => {
    if (render === null) {
      setNotification({ render: notification.render, show: false })
    } else {
      setNotification({ render, show: true })
    }
  }

  const changeSearchParams = useCallback((params: Partial<ISearchParams>) => {
    setSearchParams({ ...searchParams, ...params })
  }, [searchParams.language, searchParams.count, searchParams.order, searchParams.page])

  const changeReps = (reps: IRepositoryResponse) => {
    setRepResponse(reps);
  }

  return (
    <GlobalContext.Provider value={{
      portals: { modal, notification },
      git_token: token,
      repResponse: repResponse,
      loading: {
        repsLoading,
      },
      searchParams: { ...searchParams },
      actions: {
        setRepsLoading,
        changeModal,
        changeNotification,
        changeSearchParams,
        changeReps
      }
    }}>
      <Routes />
      <PortalsContainer />
    </GlobalContext.Provider>
  )
}

export default App
