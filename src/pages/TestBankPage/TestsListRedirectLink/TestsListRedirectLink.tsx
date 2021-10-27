import React, { FC } from 'react'
import { FolderOpenTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { TestBankListInterface } from '../../../state/tests/testsStateSlice'

interface Props extends TestBankListInterface {}

const TestsListRedirectLink: FC<Props> = ({ id, testsBank, name, description }: Props) => {
    return (
        <Link
            to={{
                pathname: `/test/${name}/${id[0]}`,
                state: {
                    id: id,
                    name: name,
                    description: description,
                    testsBank: testsBank,
                },
            }}
        >
            <FolderOpenTwoTone twoToneColor={'#fff'} />
        </Link>
    )
}

export { TestsListRedirectLink }
