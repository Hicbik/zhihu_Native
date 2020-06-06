import React, { FC } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import IconZhibo from '../../../../components/iconfont/IconZhibo'
import IconJiahao from '../../../../components/iconfont/IconJiahao'
import Icon from '../../../../components/iconfont/Icon'
import { useTypedSelector } from '../../../../store/reducer'


interface Props {
    modalRef:any
}

const Search: FC<Props> = ({modalRef}) => {
    const navigation = useNavigation()
    const state = useTypedSelector(state => state.User.isLogin)


    const LinkTo = (name: string) => () => {
        navigation.navigate(name)
    }

    const openModal = ()=>{
        if (!state) return navigation.navigate('SignIn')
        modalRef.current.openModal()
    }

    return (
        <Wrapper>
            <TouchableOpacity>
                <IconZhibo size={22} color='#444' />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={LinkTo('Search')}>
                <Input>
                    <Icon size={22} color='#444' />
                    <Text ellipsizeMode='tail' numberOfLines={1}>React Hook!</Text>
                </Input>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={openModal}>
                <IconJiahao size={22} color='#444' />
            </TouchableOpacity>
        </Wrapper>
    )
}

const Wrapper = styled.View`
background-color: #fff;
display:flex;
flex-direction: row;
padding: 10px 20px 0;
align-items: center;
`
const Input = styled.View`
flex: 1;
height: 35px;
background-color: #ebebeb;
border-radius: 8px;
margin: 0 20px;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 0 25px;
`
const Text = styled.Text`
font-size: 16px;
color: #646464;
margin-left: 10px;
`

export default Search
