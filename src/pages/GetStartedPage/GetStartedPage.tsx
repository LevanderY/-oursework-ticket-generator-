import React, { FC, useState, useEffect } from 'react'
import { Button } from 'antd'
import { CarTwoTone, AlertTwoTone, SnippetsTwoTone, RocketTwoTone, ThunderboltTwoTone, LikeTwoTone, FolderAddTwoTone } from '@ant-design/icons'
import bg from '../../assets/bg.jpg'
import classNames from 'classnames/bind'
import styles from './GetStartedPage.module.scss'

const cx = classNames.bind(styles)

const GetStartedPage: FC = () => {
    const [icon, setIcon] = useState(<AlertTwoTone />)
    const icons = [<CarTwoTone />, <AlertTwoTone />, <SnippetsTwoTone />, <RocketTwoTone />, <ThunderboltTwoTone />, <LikeTwoTone />, <FolderAddTwoTone />]

    useEffect(() => {
        setTimeout(() => {
            const num: number = Math.floor(Math.random() * icons.length - 1) + 1
            setIcon(icons[num])
        }, 3000)
    })

    return (
        <div className={cx('main')} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('${bg}')` }}>
            <div className={'container'}>
                <h1 className={cx('title')}>Тестові білетики {icon}</h1>
                <p className={cx('subtitle')}>Створи свій перший тестовий банк і згенеруй білет!</p>
                <div className={cx('btn-content')}>
                    <Button size={'large'}>Почнімо</Button>
                </div>
            </div>
        </div>
    )
}

export { GetStartedPage }
