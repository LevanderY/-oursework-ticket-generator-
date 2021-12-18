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
        email: yup.string().email().required('Email is required!').min(2, 'Too Short!').max(30, 'To long!'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password too short')
            .matches(/[a-zA-Z]/, 'Password must contain a numbers'),
        confirmPassWord: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
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
                <Divider>Registration</Divider>
                <Field type='email' name='email' label='Email' component={TextField} />
                <Field type='password' name='password' label='Password' component={TextField} />
                <Field type='password' name='confirmPassWord' label='Confirm password' component={TextField} />
                <p style={{ color: '#fff' }}>
                    Already have account? <Link to={'/sing-in'}>Sign in</Link>
                </p>
                <Button htmlType='submit' type='primary'>
                    Registration
                </Button>
            </Form>
        </Formik>
    )
}

export { SignUpForm }
