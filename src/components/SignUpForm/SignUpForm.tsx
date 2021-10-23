import React from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Button, message } from 'antd'
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
        email: yup.string().email().required('Required field').min(2, 'Too Short!').max(40, 'Too Long!'),
        password: yup
            .string()
            .required('Required field')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password must contain Latin letters!'),
        confirmPassWord: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Required field'),
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
                <Field type='email' name='email' label='Email' component={TextField} />
                <Field type='password' name='password' label='Enter password' component={TextField} />
                <Field type='password' name='confirmPassWord' label='Confirm password' component={TextField} />
                <Button htmlType='submit' type='primary'>
                    SignUp
                </Button>
            </Form>
        </Formik>
    )
}

export { SignUpForm }
