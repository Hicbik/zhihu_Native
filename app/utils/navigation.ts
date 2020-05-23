import { createRef } from 'react'

export const navigation = createRef<any>()

export const LinkToSingIn = () => {
    console.log(1)
    navigation.current.navigate('SignIn')
}
