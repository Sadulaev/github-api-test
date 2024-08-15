import { ReactNode, useRef } from 'react';
import styles from './Notification.module.css'
import { CSSTransition } from 'react-transition-group';

type Props = {
    show: boolean;
    children: ReactNode;
}

const duration = 200;

const Notification = (props: Props) => {
    const { show, children } = props;

    const nodeRef = useRef(null);

    return (
        <div className={styles.bgContainer}>
            <CSSTransition nodeRef={nodeRef} in={show} timeout={duration} unmountOnExit classNames={{
                enter: styles.animationPointEnter,
                enterActive: styles.animationPointEnterActive,
                exitActive: styles.animationPointExitActive
            }}>
                <div className={styles.container} ref={nodeRef}>{children}</div>
            </CSSTransition>
        </div>
    )
}

export default Notification