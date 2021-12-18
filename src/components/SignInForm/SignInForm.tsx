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
        email: yup.string().email().required('Email is required!').min(2, 'Too Short!').max(30, 'Email is to short!'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password too short')
            .matches(/[a-zA-Z]/, 'Password must contain a numbers'),
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
                <Divider>Log in</Divider>
                <Field type='email' name='email' label='Email' component={TextField} />
                <Field type='password' name='password' label='Password' component={TextField} />
                <p style={{ color: '#fff' }}>
                    Do not have a account? <Link to={'/singup'}>Registration</Link>
                </p>
                <Button htmlType='submit' type='primary' disabled={isSubmitLoading}>
                    {isSubmitLoading && <LoadingOutlined />}
                    Log in
                </Button>
            </Form>
        </Formik>
    )
}

export { SignInForm }
