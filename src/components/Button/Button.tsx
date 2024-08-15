import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode,
}

const Button = (props: Props) => {
    const { children } = props;
    return (
        <button {...props} className={styles.buttonStyle}>{children}</button>
    )
}

export default Button