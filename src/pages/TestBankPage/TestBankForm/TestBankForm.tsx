import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Divider, message } from 'antd'
import * as yup from 'yup'
import { TextField } from '../../../components'
import { loadingListTestsAction, TestsBankInterface } from '../../../state/tests/testsStateSlice'
import { firestore, auth } from '../../../firebase'

interface TestBankFormInterface {
    name: string
    description: string
    testsBank: TestsBankInterface[]
}

interface Props {
    title: string
    formValues?: TestBankFormInterface
    id?: string
    onCloseHandler: () => void
}

const initialFromValues: TestBankFormInterface = {
    name: '',
    description: '',
    testsBank: [],
}

const TestBankForm: React.FC<Props> = ({ title, id, onCloseHandler, formValues }: Props) => {
    const dispatch = useDispatch()
    const initialValues: TestBankFormInterface = formValues ? formValues : initialFromValues

    const responseMethod = (id: string | undefined, values: TestBankFormInterface) => {
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('test-banks')
        return id ? data.doc(id).set(values) : data.add(values)
    }

    const onSubmitHandler = async (values: TestBankFormInterface, { setErrors }: FormikHelpers<TestBankFormInterface>) => {
        try {
            await responseMethod(id, values)
            onCloseHandler()
            dispatch(loadingListTestsAction())
            message.success('Success response!')
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
                <Divider key={id}>{title}</Divider>
                <Field type='name' name='name' label='Name' component={TextField} />
                <Field type='description' name='description' label='Description' component={TextField} />
                <Button htmlType='submit' ghost>
                    {title}
                </Button>
            </Form>
        </Formik>
    )
}

export { TestBankForm }
