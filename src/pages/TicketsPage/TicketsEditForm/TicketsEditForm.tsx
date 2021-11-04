import React, { FC } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Divider, message } from 'antd'
import * as yup from 'yup'
import { TextField } from '../../../components'
import { firestore, auth } from '../../../firebase'
import { loadingTicketsListAction, QuestionsBankInterface, TicketsListInterface } from '../../../state/tickets/ticketsStateSlice'

interface TicketsFormValuesInterface {
    title: string
    author: string
    questionsBank: QuestionsBankInterface[]
}

interface Props {
    id: string
    fromValues: TicketsListInterface
    onCloseHandler: () => void
}

const TicketsEditForm: FC<Props> = ({ id, fromValues, onCloseHandler }: Props) => {
    const dispatch = useDispatch()
    const { title, author, questionsBank } = fromValues

    const initialValues: TicketsFormValuesInterface = {
        title,
        author,
        questionsBank,
    }

    const onSubmitHandler = async (values: TicketsFormValuesInterface, { setErrors }: FormikHelpers<TicketsFormValuesInterface>) => {
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('tickets')
        try {
            await data.doc(id).set(values)
            dispatch(loadingTicketsListAction())
            message.success('Ticket successful updated!')
            onCloseHandler()
        } catch (e: unknown | any) {
            setErrors(e)
            message.error(`Ops, ${e}`)
        }
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required field').min(4, 'Name is to short').max(45, 'Name is to long'),
        author: yup.string().required('Required field').min(4, 'Author name is to short').max(25, 'Author name is to long'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off'>
                <Divider key={id}>{title}</Divider>
                <Field type='name' name='title' label='Title' component={TextField} />
                <Field type='text' name='author' label='Author' component={TextField} />
                <Button htmlType='submit' ghost>
                    Edit ticket
                </Button>
            </Form>
        </Formik>
    )
}

export { TicketsEditForm }
