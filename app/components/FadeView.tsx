import React, { FC, useState, useEffect } from 'react'
import { Animated } from 'react-native'


interface Props {
    style: any,
    children: React.ReactNode,
    close: () => void
}

const FadeView: FC<Props> = ({style, children, close}) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // 透明度初始值设为0

    useEffect(() => {
        Animated.timing(fadeAnim, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500
            }
        ).start(_end)
    }, [])

    const _end = () => {
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                    useNativeDriver: false,
                    toValue: 0,
                    duration: 500
                }
            ).start(close)
        },500)
    }

    return (
        <Animated.View
            style={{
                ...style,
                opacity: fadeAnim,
            }}
        >
            {children}
        </Animated.View>
    )
}

export default FadeView
