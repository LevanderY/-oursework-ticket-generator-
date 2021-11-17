import React, { FC } from 'react'
import { Modal, Popover } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { TestsForm } from '../../TestsForm/TestsForm'
import { TestActionsPropsInterface } from '../TestsActions'

interface Props extends TestActionsPropsInterface {}

const TestsEditIconButton: FC<Props> = ({ currentTestBankId, formValues }: Props) => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <Popover title={'Edit test!'} trigger='hover'>
                <EditTwoTone twoToneColor='#fff' onClick={onOpenHandler} />
            </Popover>
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestsForm title={'Edit test'} onCloseHandler={onCloseHandler} currentTestId={currentTestBankId} formValues={formValues} />
            </Modal>
        </>
    )
}

export { TestsEditIconButton }
