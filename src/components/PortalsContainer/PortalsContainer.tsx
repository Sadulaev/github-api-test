import { useContext, useEffect } from "react"
import PortalsContext from "../../context/GlobalContext"
import styles from './PortalsContainer.module.css'
import Notification from "../Notification/Notification"
import Modal from "../Modal/Modal"

const PortalsContainer = () => {
    const { portals, actions } = useContext(PortalsContext)

    useEffect(() => {
        if (portals.notification.show) {
            setTimeout(() => actions.changeNotification(null), 5000)
        }
    }, [portals.notification.show, portals.changeNotification])


    return (
        <div className={styles.container}>
            <Modal onClose={() => actions.changeModal(null)} show={portals.modal.show}>
                {portals.modal.render}
            </Modal>
            <Notification show={portals.notification.show}>
                {portals.notification.render}
            </Notification>
        </div>
    )
}

export default PortalsContainer