import React, { FC } from 'react'
import { TestsDeleteIconButton } from './TestsDeleteIconButton'
import { TestsEditIconButton } from './TestsEditIconButton'
import { TestBankListInterface } from '../../../state/tests/testsStateSlice'

export interface TestActionsPropsInterface {
    currentTestBankId: string
    formValues: TestBankListInterface
}

interface Props extends TestActionsPropsInterface {}

const TestsActions: FC<Props> = ({ currentTestBankId, formValues }: Props) => {
    return (
        <>
            <TestsEditIconButton currentTestBankId={currentTestBankId} formValues={formValues} />
            <TestsDeleteIconButton currentTestId={currentTestBankId} formValues={formValues} />
        </>
    )
}

export { TestsActions }
