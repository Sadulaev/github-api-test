import styles from './SearchButton.module.css';
import searchIcon from '../../../../assets/search-icon.svg'

type Props = {
    onClick: () => void;
}

const SearchButton = (props: Props) => {
    const { onClick } = props;
    return (
        <div className={styles.searchButton} onClick={onClick}>
            <img src={searchIcon} alt="search" className={styles.searchIcon} />
        </div>
    )
}

export default SearchButton;