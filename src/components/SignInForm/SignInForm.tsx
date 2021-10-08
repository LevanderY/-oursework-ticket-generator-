import React from 'react'
import * as yup from 'yup'
import { Button, message } from 'antd'
import { Field, Form, Formik } from 'formik'
import { TextField } from '../index'
import { auth } from '../../firebase'
import classNames from 'classnames/bind'
import styles from './SignInForm.module.scss'

const cx = classNames.bind(styles)

interface SignInIValuesInterface {
    email: string
    password: string
}

const SignInForm: React.FC = () => {
    const initialValues: SignInIValuesInterface = {
        email: '',
        password: '',
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Required field').min(2, 'Too Short!').max(30, 'Too Long!'),
        password: yup
            .string()
            .required('Required field')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password must contain Latin letters!'),
    })

    const onSubmitHandler = async (values: SignInIValuesInterface) => {
        try {
            const { email, password } = values
            await auth.signInWithEmailAndPassword(email, password)
            message.success('Login successful')
        } catch {
            message.error(`Invalid email or password!`)
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off' className={cx('form-container')}>
                <Field type='email' name='email' label='Email' component={TextField} />
                <Field type='password' name='password' label='Enter password' component={TextField} />
                <Button htmlType='submit' type='primary'>
                    SignUp
                </Button>
            </Form>
        </Formik>
    )
}

export { SignInForm }
