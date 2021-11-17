import React, { useState } from 'react'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { Button, message, Divider } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Field, Form, Formik } from 'formik'
import { TextField } from '../index'
import { auth, firestore } from '../../firebase'
import { loginAuthAction } from '../../state/auth/authStateSlice'
import { Link, useHistory } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './SignInForm.module.scss'

const cx = classNames.bind(styles)

interface SignInIValuesInterface {
    email: string
    password: string
}

const SignInForm: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSubmitLoading, setSubmitLoading] = useState<boolean>(false)

    const initialValues: SignInIValuesInterface = {
        email: '',
        password: '',
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email().required("Iм'я обовя'зкове!").min(2, 'Too Short!').max(30, "Занадто довге ім'я!"),
        password: yup
            .string()
            .required("Пароль обовя'зковий")
            .min(6, 'Пароль занадто короткий')
            .matches(/[a-zA-Z]/, 'Пароль мусить містити цифри'),
    })

    const onSubmitHandler = async ({ email, password }: SignInIValuesInterface) => {
        try {
            setSubmitLoading(true)
            await auth.signInWithEmailAndPassword(email, password)
            await firestore.collection('root').doc(auth.currentUser?.uid).set({})

            const idToken = await auth.currentUser?.getIdToken()
            dispatch(loginAuthAction({ idToken: idToken }))

            history.push('/')
            message.success('Login successful')
        } catch {
            setSubmitLoading(false)
            message.error(`Invalid email or password!`)
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off' className={cx('form-container')}>
                <Divider>Вхід</Divider>
                <Field type='email' name='email' label='Пошта' component={TextField} />
                <Field type='password' name='password' label='Введіть пароль' component={TextField} />
                <p style={{ color: '#fff' }}>
                    Нету аккаунта? <Link to={'/singup'}>Реєстрація</Link>
                </p>
                <Button htmlType='submit' type='primary' disabled={isSubmitLoading}>
                    {isSubmitLoading && <LoadingOutlined />}
                    Увійти
                </Button>
            </Form>
        </Formik>
    )
}

export { SignInForm }
