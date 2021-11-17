import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import * as yup from 'yup'
import { Button, message, Divider } from 'antd'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { TextField } from '../index'
import { auth } from '../../firebase'
import classNames from 'classnames/bind'
import styles from './SignUpForm.module.scss'

const cx = classNames.bind(styles)

interface SignUpIValuesInterface {
    email: string
    password: string
    confirmPassWord: string
}

const SignUpForm: React.FC = () => {
    const history = useHistory()

    const initialValues: SignUpIValuesInterface = {
        email: '',
        password: '',
        confirmPassWord: '',
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email().required("Iм'я обовя'зкове!").min(2, 'Too Short!').max(30, "Занадто довге ім'я!"),
        password: yup
            .string()
            .required("Пароль обовя'зковий")
            .min(6, 'Пароль занадто короткий')
            .matches(/[a-zA-Z]/, 'Пароль мусить містити цифри'),
        confirmPassWord: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Паролі повині збігатись')
            .required("Це поле є обовя'зковим"),
    })

    const onSubmitHandler = async (values: SignUpIValuesInterface, { setErrors }: FormikHelpers<SignUpIValuesInterface>) => {
        try {
            const { email, password } = values
            await auth.createUserWithEmailAndPassword(email, password)
            history.push('/login')
            message.success('Login successful')
        } catch (e: unknown | any) {
            setErrors(e?.response?.data)
            message.error(`Smt wrong ${e}`)
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off' className={cx('form-container')}>
                <Divider>Реєстрація</Divider>
                <Field type='email' name='email' label='Пошта' component={TextField} />
                <Field type='password' name='password' label='Введіть пароль' component={TextField} />
                <Field type='password' name='confirmPassWord' label='Підтвердіть пароль' component={TextField} />
                <p style={{ color: '#fff' }}>
                    Є аккаунт? <Link to={'/sing-in'}>Увійти</Link>
                </p>
                <Button htmlType='submit' type='primary'>
                    Реєстрація
                </Button>
            </Form>
        </Formik>
    )
}

export { SignUpForm }
