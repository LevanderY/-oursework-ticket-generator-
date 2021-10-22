import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Button, Divider, message } from 'antd'
import { TextField } from '../../../components'
import { loadingListTestsAction, TestBankListInterface, TestsBankInterface } from '../../../state/tests/testsStateSlice'
import { TestBanKFormValuesInterface } from '../TestBankForm'
import { auth, firestore } from '../../../firebase'

interface Props {
    onCloseHandler: () => void
    formValues: TestBankListInterface
    title: string
}

const initialValues: { test: string } = {
    test: '',
}

const TestsForm: FC<Props> = ({ formValues: { id, name, description, testsBank }, onCloseHandler, title }: Props) => {
    const dispatch = useDispatch()

    const values: TestBankListInterface = { id, name, description, testsBank }

    const responseMethod = (id: string | undefined, values: TestBanKFormValuesInterface) => {
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('test-banks')
        return data.doc(id).set(values)
    }

    const onSubmitHandler = async (textTest: { test: string }, { setErrors }: FormikHelpers<{ test: string }>) => {
        // Adding random id for test
        const test: TestsBankInterface = {
            id: `_${Math.random().toString(36).substr(2, 9)}`,
            ...textTest,
        }

        values.testsBank = [...values.testsBank, test]

        try {
            await responseMethod(id, values)
            dispatch(loadingListTestsAction())
            onCloseHandler()
            message.success('Test has been successfully added!')
        } catch (e: unknown | any) {
            setErrors(e?.response?.data)
            message.error(`Ops, ${e?.response?.data}`)
        }
    }

    const validationSchema = yup.object().shape({
        test: yup.string().required('Required field').min(4, 'Test is to short').max(40, 'Name is to long'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off'>
                <Divider>{title}</Divider>
                <Field type='text' name='test' label='Test description' component={TextField} />
                <Button htmlType='submit' type='primary'>
                    {title}
                </Button>
            </Form>
        </Formik>
    )
}

export { TestsForm }
