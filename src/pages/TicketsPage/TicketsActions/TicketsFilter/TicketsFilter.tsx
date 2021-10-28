import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { Field, Form, Formik } from 'formik'
import { Button } from 'antd'
import * as yup from 'yup'
import { NumberField, TextField } from '../../../../components'
import { TestsBankInterface } from '../../../../state/tests/testsStateSlice'

interface TicketsFilterValuesInterface {
    name: string
    author: string
    numOfOptions: number
    maxQuestions: number
}

interface Props {
    testsBank: TestsBankInterface[]
}

const initialValues: TicketsFilterValuesInterface = {
    name: '',
    author: '',
    numOfOptions: 0,
    maxQuestions: 0,
}

const TicketsFilter: FC<Props> = ({ testsBank }: Props) => {
    const onSubmitHandler = async () => {
        let i = 0
        let ticketsBank: any[] = []
        const randomArr = () => Math.random() - 0.5

        while (i < 5) {
            i++
            const bank = [...testsBank]
            bank.sort(randomArr)
            bank.splice(0, 1)
            ticketsBank = [...ticketsBank, bank]
        }

        console.log(ticketsBank)
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
                        <Field type='name' name='name' label='Ticket name' component={TextField} />
                    </Col>
                    <Col span={6}>
                        <Field type='text' name='author' label='Author' component={TextField} />
                    </Col>
                    <Col span={6}>
                        <Field type='text' name='numOfOptions' label='How many variants?' component={NumberField} />
                    </Col>
                    <Col span={6}>
                        <Field type='text' name='maxQuestions' label='How many questions?' component={TextField} />
                    </Col>
                </Row>
                <Button htmlType='submit' ghost>
                    Create tickets
                </Button>
            </Form>
        </Formik>
    )
}

export { TicketsFilter }
