import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
    return (
        <input {...props} className={styles.inputStyles} />
    )
}

export default Input