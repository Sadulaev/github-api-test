import Button from '../../../../components/Button/Button';
import styles from './SearchModal.module.css';
import searchRepositories from '../../../../requests/searchRepositories';
import { useContext } from 'react';
import GlobalContext from '../../../../context/GlobalContext';
import infinityAnimation from '../../../../assets/spinner-icon-animated.svg';

const SearchModal = () => {
    const { actions, searchParams, loading } = useContext(GlobalContext)

    return (
        <div className={styles.container}>
            {loading.repsLoading ? (
                <div className={styles.containerLoading}>
                    <img src={infinityAnimation} alt="spinner" />
                </div>
            ) : (
                <div className={styles.searchParams}>
                    <div>
                        <label htmlFor='language'>Language:</label>
                        <input name='language' value={searchParams.language} onChange={(e) => actions.changeSearchParams({ language: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='count'>One page items count:</label>
                        <input name='count' type='number' value={searchParams.count} onChange={(e) => {
                            if (!Number.isNaN(+e.target.value)) {
                                if (+e.target.value > 100) {
                                    actions.changeSearchParams({ count: 100 });
                                } else if (+e.target.value < 1) {
                                    actions.changeSearchParams({ count: 1 })
                                } else {
                                    actions.changeSearchParams({ count: +e.target.value })
                                }
                            }
                        }} />
                    </div>
                    <div>
                        <label htmlFor='order'>Order:</label>
                        <select name='order' defaultValue={searchParams.order} onChange={(e) => actions.changeSearchParams({ order: e.target.value as 'asc' })}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div>
                        <Button onClick={async () => {
                            actions.setRepsLoading(true)
                            const res = await searchRepositories(searchParams.language, searchParams.order, 1, searchParams.count);
                            actions.changeSearchParams({ page: 1 });
                            actions.changeReps(res);
                            if (res.items.length) {
                                actions.changeModal(null)
                            }
                            actions.setRepsLoading(false)
                        }}>Find</Button>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default SearchModal