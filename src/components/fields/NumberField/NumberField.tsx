import React, { FC } from 'react'
import { Input } from 'antd'
import { FieldInputProps, FormikProps, useField } from 'formik'
import classNames from 'classnames/bind'
import styles from '../fieldStyle.module.scss'

const cx = classNames.bind(styles)

interface Props {
    field: FieldInputProps<any>
    form: FormikProps<any>
    label: string
    type?: string
    maxLength?: number
}

const NumberField: FC<Props> = ({ field: { name, value, onBlur }, form: { touched, errors }, label, type = 'text', maxLength }: Props) => {
    const [, , { setValue }] = useField(name)

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.validity?.valid) setValue(event?.target?.value)
    }

    return (
        <label className={cx('field-container')}>
            <h3 className={cx('title')}>{label}</h3>
            <Input name={name} value={value} onChange={onChangeHandler} onBlur={onBlur} type={type} pattern='[0-9]*' maxLength={maxLength} />
            <span className={cx('error')}>{touched[name] && errors[name] && errors[name]}</span>
        </label>
    )
}

export { NumberField }
