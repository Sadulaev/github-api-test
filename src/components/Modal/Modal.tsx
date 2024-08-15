import { ReactNode, useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import { CSSTransition } from 'react-transition-group'

type Props = {
  show: boolean;
  children: ReactNode | null;
  onClose: () => void;
}

const duration = 200;

const Modal = (props: Props) => {
  const { show, children, onClose } = props;

  const windowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (windowRef.current && !windowRef.current?.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', onClickOutside);

    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [windowRef, onClose])

  return (
    <CSSTransition nodeRef={bgRef} in={!!show} timeout={duration} unmountOnExit classNames={{
      enter: styles.bgAnimationPointEnter,
      enterActive: styles.bgAnimationPointEnterActive,
      exitActive: styles.bgAnimationPointExitActive,
    }}>
      <div ref={bgRef} className={styles.modalContainer}>
        <div ref={windowRef} className={styles.container}>{children}</div>
      </div>
    </CSSTransition>

  )
}

export default Modal