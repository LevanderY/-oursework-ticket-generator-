import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useFirstLoadingHook } from '../../../hooks/useFirstLoadingHook'
import { useAnimationTimeoutHook } from '../../../hooks/useAnimationTimeoutHook'
import classNames from 'classnames/bind'
import styles from './LoadingSpin.module.scss'

const cx = classNames.bind(styles)

interface Props {
    top?: number
    isFixed?: boolean
    isLoading: boolean
    fontSize?: number
    isHaveFirstLoading?: boolean
}

const LoadingSpin: React.FC<Props> = ({ top, isFixed, isLoading, fontSize = 60, isHaveFirstLoading }: Props) => {
    const { isShow, isAnimation } = useAnimationTimeoutHook(isLoading)
    const { isComponentHide } = useFirstLoadingHook(isHaveFirstLoading)
    if (isComponentHide) return null
    return (
        <div
            className={cx('spin-container', {
                'spin-container_fixed': isFixed,
                'spin-container_absolute': !isFixed,
                'spin-container_show': isShow,
                'spin-container_animation': isAnimation,
            })}
            style={{ top }}
        >
            <Spin indicator={<LoadingOutlined style={{ fontSize }} spin />} />
        </div>
    )
}

export { LoadingSpin }
