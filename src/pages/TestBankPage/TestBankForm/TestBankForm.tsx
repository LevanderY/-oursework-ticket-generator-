import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Button, Divider } from 'antd'
import * as yup from 'yup'
import { TextField } from '../../../components'

interface TestBanKFormValuesInterface {
    name: string
    description: string
}

interface Props {
    title: string
}

const TestBankForm: React.FC<Props> = ({ title }: Props) => {
    const initialValues: TestBanKFormValuesInterface = {
        name: '',
        description: '',
    }

    const onSubmitHandler = async (values: TestBanKFormValuesInterface, { setErrors }: FormikHelpers<TestBanKFormValuesInterface>) => {
        const { name, description } = values
        try {
            console.log(`${name} ${description}`)
        } catch (e: unknown | any) {
            setErrors(e?.response?.data)
        }
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Required field').min(4, 'Name is to short').max(12, 'Name is to long'),
        description: yup.string().required('Required field').min(6, 'Description is to short').max(40, 'Description is to long'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off'>
                <Divider>{title}</Divider>
                <Field type='name' name='name' label='Name' component={TextField} />
                <Field type='description' name='description' label='Description' component={TextField} />
                <Button htmlType='submit' type='primary'>
                    SignUp
                </Button>
            </Form>
        </Formik>
    )
}

export { TestBankForm }
