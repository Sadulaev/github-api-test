import { useCallback, useContext, useMemo } from "react";
import GlobalContext from "../../../../context/GlobalContext";
import styles from "./PaginationController.module.css"
import searchRepositories from "../../../../requests/searchRepositories";

const PaginationController = () => {
    const { searchParams, repResponse, actions } = useContext(GlobalContext)

    const lastPage = useMemo(() => {
        if (repResponse?.total_count) {
            return Math.ceil(repResponse?.total_count / searchParams.count);
        }
        return 1;
    }, [repResponse?.total_count, searchParams.count])

    const clickablePages = useMemo(() => {
        if (searchParams.page === 1) {
            return [{ number: searchParams.page, isCurrent: true }, { number: searchParams.page + 1, isCurrent: false }]
        }
        if (searchParams.page === lastPage) {
            return [{ number: searchParams.page - 1, isCurrent: false }, { number: searchParams.page, isCurrent: true }]
        }
        return [
            { number: searchParams.page - 1, isCurrent: false },
            { number: searchParams.page, isCurrent: true },
            { number: searchParams.page + 1, isCurrent: false },
        ]
    }, [searchParams.page, lastPage])

    const changePage = useCallback(async (page: number) => {
        let isSuccess = false;
        actions.setRepsLoading(true)
        if (page !== searchParams.page) {
            const res = await searchRepositories(searchParams.language, searchParams.order, page, searchParams.count)
            if (res.items.length) { isSuccess = true }
            actions.changeReps(res)
        }
        if (isSuccess) {
            actions.changeSearchParams({ page })
        }
        actions.setRepsLoading(false)
    }, [searchParams.language, searchParams.order, searchParams.count, actions.changeSearchParams, actions.changeReps])

    return (
        <div className={styles.container}>
            <div className={styles.pages}>
                {searchParams.page > 2 && (
                    <div className={styles.pageNumber} onClick={() => changePage(1)}>1</div>
                )}
                {searchParams.page > 3 && (
                    <span>{'...'}</span>
                )}
                {clickablePages.map((page) => <div className={page.isCurrent ? styles.currentPageNumber : styles.pageNumber} onClick={() => changePage(page.number)} key={page.number}>{page.number}</div>)}
                {searchParams.page !== lastPage && (
                    <>
                        <span>{'...'}</span>
                        <div className={styles.pageNumber} onClick={() => changePage(lastPage)}>{lastPage}</div>
                    </>
                )}
            </div>

        </div >
    )
}

export default PaginationController