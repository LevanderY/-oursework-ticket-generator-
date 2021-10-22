import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Button, Divider, message } from 'antd'
import { TextField } from '../../../components'

interface TestsFormValuesInterface {
    test: string
}

interface Props {
    onCloseHandler: () => void
    formValues: TestsFormValuesInterface
    title: string
    id?: string
}

const initialFromValues: TestsFormValuesInterface = {
    test: '',
}

const TestsForm: FC<Props> = ({ title, formValues, onCloseHandler, id }: Props) => {
    const dispatch = useDispatch()
    const initialValues: TestsFormValuesInterface = formValues ? formValues : initialFromValues

    const onSubmitHandler = async (values: TestsFormValuesInterface, { setErrors }: FormikHelpers<TestsFormValuesInterface>) => {
        try {
        } catch (e: unknown | any) {
            setErrors(e?.response?.data)
            message.error(`Opps, ${e?.response?.data}`)
        }
    }

    const validationSchema = yup.object().shape({
        test: yup.string().required('Required field').min(4, 'Test is to short').max(40, 'Name is to long'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off'>
                <Divider>{title}</Divider>
                <Field type='test' name='test' label='test' component={TextField} />
                <Button htmlType='submit' type='primary'>
                    {title}
                </Button>
            </Form>
        </Formik>
    )
}

export { TestsForm }
