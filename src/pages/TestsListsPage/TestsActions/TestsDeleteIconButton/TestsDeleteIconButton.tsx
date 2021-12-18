import React, { FC } from 'react'
import { message, Popover } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { loadingListTestsAction, TestBankListInterface, TestsBankInterface } from '../../../../state/tests/testsStateSlice'
import { auth, firestore } from '../../../../firebase'

interface Props {
    currentTestId: string
    formValues: TestBankListInterface
}

const TestsDeleteIconButton: FC<Props> = ({ formValues: { id, name, description, testsBank }, currentTestId }: Props) => {
    const dispatch = useDispatch()
    const values: TestBankListInterface = { id, name, description, testsBank }

    const responseMethod = (id: string | undefined, values: TestBankListInterface) => {
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('test-banks')
        return data.doc(id).set(values)
    }

    const onDeleteTestHandler = (id: string | undefined, values: TestBankListInterface) => async () => {
        values.testsBank = values.testsBank.filter(({ id }: TestsBankInterface) => id !== currentTestId)
        try {
            await responseMethod(id, values)
            dispatch(loadingListTestsAction())
            message.success('Test has been successfully deleted!')
        } catch (e: any | unknown) {
            message.error(e)
        }
    }

    return (
        <Popover title={'Видалити тест?'} trigger='hover'>
            <DeleteOutlined onClick={onDeleteTestHandler(id, values)} />
        </Popover>
    )
}

export { TestsDeleteIconButton }
