import { useContext, useEffect, useState } from "react";
import ListContainer from "./components/ListContainer/ListContainer";
import PaginationController from "./components/PaginationController/PaginationController";
import searchRepositories from "../../requests/searchRepositories";
import PortalsContext from "../../context/GlobalContext";
import { AxiosError } from "axios";
import SearchButton from "./components/SearchButton/SearchButton";
import SearchModal from "./components/SearchModal/SearchModal";

const RepList = () => {
    const { actions, searchParams } = useContext(PortalsContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        (async function () {
            actions.setRepsLoading(true)
            try {
                const res = await searchRepositories(searchParams.language, searchParams.order, searchParams.page, searchParams.count);
                if (res.items.length) {
                    actions.changeReps(res)
                    setIsLoading(false)
                }
            } catch (err) {
                const error = err as AxiosError
                actions.changeNotification(error?.message)
            }
            actions.setRepsLoading(false)
        })()

    }, [actions.setRepsLoading])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SearchButton
                onClick={() => actions.changeModal(
                    <SearchModal />
                )}
            />
            <ListContainer />
            <PaginationController />
        </div>
    )
}

export default RepList