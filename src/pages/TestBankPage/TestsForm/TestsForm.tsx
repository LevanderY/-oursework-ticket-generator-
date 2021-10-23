import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Button, Divider, message } from 'antd'
import { TextField } from '../../../components'
import { loadingListTestsAction, TestBankListInterface, TestsBankInterface } from '../../../state/tests/testsStateSlice'
import { auth, firestore } from '../../../firebase'

interface Props {
    onCloseHandler: () => void
    currentTestId?: string
    formValues: TestBankListInterface
    title: string
}

const initialValues: { test: string } = {
    test: '',
}

const TestsForm: FC<Props> = ({ formValues: { id, name, description, testsBank }, onCloseHandler, title, currentTestId }: Props) => {
    const dispatch = useDispatch()
    const values: TestBankListInterface = { id, name, description, testsBank }

    const responseMethod = (id: string | undefined, values: TestBankListInterface) => {
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('test-banks')
        return data.doc(id).set(values)
    }

    const onSubmitHandler = async (textTest: { test: string }, { setErrors }: FormikHelpers<{ test: string }>) => {
        const updateTestBank = (values: TestBankListInterface) => {
            let updatedTestBank: TestsBankInterface[] = [...values.testsBank]
            // Creating test with new id
            const test: TestsBankInterface = {
                id: `_${Math.random().toString(36).substr(2, 9)}`,
                ...textTest,
            }

            return !currentTestId
                ? [...updatedTestBank, test]
                : updatedTestBank.map((item: TestsBankInterface) => {
                      return item.id === currentTestId ? { ...item, test: textTest.test } : item
                  })
        }

        //Updating test bank
        values.testsBank = updateTestBank(values)
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
                <Divider key={id}>{title}</Divider>
                <Field type='text' name='test' label='Test description' component={TextField} />
                <Button htmlType='submit' ghost>
                    {title}
                </Button>
            </Form>
        </Formik>
    )
}

export { TestsForm }
