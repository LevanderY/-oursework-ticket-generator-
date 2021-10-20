import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Divider, message } from 'antd'
import * as yup from 'yup'
import { TextField } from '../../../components'
import { loadingListTestsAction, TestsBankInterface } from '../../../state/tests/testsStateSlice'
import { firestore } from '../../../firebase'

export interface TestBanKFormValuesInterface {
    name: string
    description: string
    testsBank: TestsBankInterface[]
}

interface Props {
    title: string
    formValues?: TestBanKFormValuesInterface
    id?: string
    onCloseHandler: () => void
}

const initialFromValues: TestBanKFormValuesInterface = {
    name: '',
    description: '',
    testsBank: [],
}

const TestBankForm: React.FC<Props> = ({ title, formValues, id, onCloseHandler }: Props) => {
    const dispatch = useDispatch()
    const initialValues: TestBanKFormValuesInterface = formValues ? formValues : initialFromValues

    const responseMethod = (id: string | undefined, values: TestBanKFormValuesInterface) =>
        id ? firestore.collection('test-banks').doc(id).set(values) : firestore.collection('test-banks').add(values)

    const onSubmitHandler = async (values: TestBanKFormValuesInterface, { setErrors }: FormikHelpers<TestBanKFormValuesInterface>) => {
        try {
            await responseMethod(id, values)
            onCloseHandler()
            dispatch(loadingListTestsAction())
            message.success('Test bank has been edited!')
        } catch (e: unknown | any) {
            setErrors(e?.response?.data)
            message.error(`Opps, ${e?.response?.data}`)
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
                    {title}
                </Button>
            </Form>
        </Formik>
    )
}

export { TestBankForm }
