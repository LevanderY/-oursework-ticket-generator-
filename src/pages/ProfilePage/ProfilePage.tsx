import React from 'react'
import { auth } from '../../firebase'
import { Card } from 'antd'
const { Meta } = Card

const ProfilePage: React.FC = () => {
    if (!auth.currentUser) return <></>
    const { displayName, email } = auth.currentUser

    return (
        <Card hoverable style={{ width: 240 }} cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}>
            <Meta title={displayName} description={email} />
        </Card>
    )
}

export { ProfilePage }
