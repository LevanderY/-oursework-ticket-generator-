import React, { FC } from 'react'
import { Row, Col, message } from 'antd'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Button } from 'antd'
import * as yup from 'yup'
import { NumberField, TextField } from '../../../../components'
import { ticketGenerator } from '../../../../utils/ticketGenerator'
import { TestsBankInterface } from '../../../../state/tests/testsStateSlice'
import { auth, firestore } from '../../../../firebase'
import { useDispatch } from 'react-redux'
import { loadingTicketsListAction } from '../../../../state/tickets/ticketsStateSlice'

export interface TicketsFilterValuesInterface {
    name: string
    author: string
    numOfOptions: number
    maxQuestions: number
}

interface Props {
    testsBank: TestsBankInterface[]
    onCloseHandler: () => void
}

const initialValues: TicketsFilterValuesInterface = {
    name: '',
    author: '',
    numOfOptions: 0,
    maxQuestions: 0,
}

const TicketsFilter: FC<Props> = ({ testsBank, onCloseHandler }: Props) => {
    const dispatch = useDispatch()

    const onSubmitHandler = async (values: TicketsFilterValuesInterface, { setErrors }: FormikHelpers<TicketsFilterValuesInterface>) => {
        const value = ticketGenerator(values, testsBank)
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('tickets')
        try {
            await data.add(value)
            dispatch(loadingTicketsListAction())
            onCloseHandler()
        } catch (e: unknown | any) {
            setErrors(e)
            message.error(`Ops, ${e}`)
        }
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Required field').min(4, 'Name is to short').max(25, 'Name is to long'),
        author: yup.string().required('Required field').min(4, 'Author name is to short').max(25, 'Author name is to long'),
        numOfOptions: yup.number().required('Required field').min(1, 'Must contain at lest 1 variant').max(10, 'Too many..'),
        maxQuestions: yup
            .number()
            .required('Required field')
            .min(1, 'Must contain at lest 1 question')
            .max(testsBank.length, 'Too many questions(add some question in test bank)'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
            <Form autoComplete='off'>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Field name='name' label='Ticket name' component={TextField} />
                    </Col>
                    <Col span={6}>
                        <Field name='author' label='Author' component={TextField} />
                    </Col>
                    <Col span={6}>
                        <Field name='numOfOptions' label='Number of options ?' component={NumberField} />
                    </Col>
                    <Col span={6}>
                        <Field name='maxQuestions' label='Number of questions?' component={TextField} />
                    </Col>
                </Row>
                <Button htmlType='submit' ghost>
                    Generate ticket
                </Button>
            </Form>
        </Formik>
    )
}

export { TicketsFilter }
