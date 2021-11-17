import React, { FC } from 'react'
import { message, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import { DeleteTwoTone } from '@ant-design/icons'
import { auth, firestore } from '../../../../firebase'
import { loadingListTestsAction } from '../../../../state/tests/testsStateSlice'

interface Props {
    id: string
}

const TestBankDeleteButton: FC<Props> = ({ id }: Props) => {
    const dispatch = useDispatch()
    const onDeleteTestBankHandler = async () => {
        try {
            await firestore.collection('root').doc(auth.currentUser?.uid).collection('test-banks').doc(id).delete()
            dispatch(loadingListTestsAction())
            message.success('Тестовий банк видалений!')
        } catch (e: any | unknown) {
            message.error(e)
        }
    }
    return (
        <Popover title={'Видалити?'} trigger='hover'>
            <DeleteTwoTone twoToneColor={'#fff'} onClick={onDeleteTestBankHandler} />
        </Popover>
    )
}

export { TestBankDeleteButton }
