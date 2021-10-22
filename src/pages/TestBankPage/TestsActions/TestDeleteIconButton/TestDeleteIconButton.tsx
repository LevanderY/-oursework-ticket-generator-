import React, { FC } from 'react'
import { message, Popover } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { loadingListTestsAction, TestBankListInterface, TestsBankInterface } from '../../../../state/tests/testsStateSlice'
import { auth, firestore } from '../../../../firebase'
import { TestBanKFormValuesInterface } from '../../TestBankForm'

interface Props {
    currentTestId: string
    formValues: TestBankListInterface
}

const TestDeleteIconButton: FC<Props> = ({ formValues: { id, name, description, testsBank }, currentTestId }: Props) => {
    const dispatch = useDispatch()

    const values: TestBankListInterface = {
        id,
        name,
        description,
        testsBank,
    }

    const responseMethod = (id: string | undefined, values: TestBanKFormValuesInterface) => {
        const data = firestore.collection('root').doc(auth.currentUser?.uid).collection('test-banks')
        return data.doc(id).set(values)
    }

    const onDeleteTestHandler = (id: string | undefined, values: TestBanKFormValuesInterface) => async () => {
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
        <Popover title={'Delete test?'} trigger='hover'>
            <DeleteOutlined onClick={onDeleteTestHandler(id, values)} />
        </Popover>
    )
}

export { TestDeleteIconButton }
