import { useContext } from "react";
import styles from './ListContainer.module.css'
import GlobalContext from "../../../../context/GlobalContext";
import Button from "../../../../components/Button/Button";
import stars from "../../../../assets/star-icon.svg";
import fork from "../../../../assets/fork-icon.svg";
import eye from "../../../../assets/eye-icon.svg";
import infinityAnimation from "../../../../assets/spinner-icon-animated.svg"

const ListContainer = () => {
  const { actions, repResponse, loading } = useContext(GlobalContext);

  const openRepPage = (url: string, name: string) => {
    actions.changeModal(
      <div className={styles.alertModal}>
        <h4>Do you want to open github page of "{name}"</h4>
        <Button onClick={() => {
          window.open(url, "_blank")
          actions.changeModal(null)
        }}>Open</Button>
      </div>)
  }

  return (
    <div className={styles.container}>
      {loading.repsLoading ? (
        <div className={styles.containerLoading}>
          <img src={infinityAnimation} alt="spinner" />
        </div>
      ) : (
        !loading.repsLoading && repResponse && repResponse.items.map((rep) => (
          <div className={styles.repCard} onClick={() => openRepPage(rep?.html_url, rep?.name)} key={rep.id}>
            <div className={styles.cardTop}>
              <img src={rep.owner?.avatar_url} className={styles.image} alt='avatar' />
              <div className={styles.repInfo}>
                <h4 title={rep.full_name}>{rep.name}</h4>
                <p title={rep.description}>{rep.description?.length > 60 ? rep.description.slice(0, 80) + '...' : rep.description}</p>
              </div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.cardProperty}>
                <img src={stars} alt="star" className={styles.star} />
                <span>{rep?.stargazers_count}</span>
              </div>
              <div className={styles.cardProperty}>
                <img src={fork} alt="fork" className={styles.star} />
                <span>{rep?.forks_count}</span>
              </div>
              <div className={styles.cardProperty}>
                <img src={eye} alt="watcher" className={styles.star} />
                <span>{rep?.watchers_count}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ListContainer