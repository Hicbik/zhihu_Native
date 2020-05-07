import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import { View, TouchableHighlight } from 'react-native'
import IconArrowRight from '../../../../components/iconfont/IconArrowRight'
import SearchInput from './SearchInput'
import { useNavigation } from '@react-navigation/native'


interface Props {
    state: any
}

const Header: FC<Props> = ({state}) => {
    const navigation = useNavigation()


    const LinkTo = (name: string) => () => {
        navigation.navigate(name)
    }

    return (
        <Wrapper colors={['#158dfe', '#65b2fa', '#6eb7fb']}>
            <SearchInput />
            <PeopleWrapper>
                {
                    state.isLogin ? (
                        <People>
                            <Avatar
                                source={{uri: 'https://pic2.zhimg.com/v2-fc466e21693dc8f06d8ec4485a110428_is.jpg'}} />
                            <View>
                                <Text>阿库娅</Text>
                                <MinorText>智慧女神</MinorText>
                            </View>
                            <View style={{marginLeft: 'auto', flexDirection: 'row', alignItems: 'center'}}>
                                <MinorText>个人主页</MinorText>
                                <IconArrowRight color='#999' size={16} />
                            </View>
                        </People>
                    ) : (
                        <LoginWrapper>
                            <Text>登录知乎，体验更多功能!</Text>
                            <TouchableHighlight onPress={LinkTo('SignIn')} style={{borderRadius: 5, margin: 5}}>
                                <Button>登录</Button>
                            </TouchableHighlight>
                        </LoginWrapper>
                    )
                }
                <InfoWrapper>
                    <View style={{alignItems: 'center'}}>
                        <Text>42</Text>
                        <Text style={{fontSize: 14}}>我的关注</Text>
                    </View>
                    <Line />
                    <View style={{alignItems: 'center'}}>
                        <Text>42</Text>
                        <Text style={{fontSize: 14}}>收藏夹</Text>
                    </View>
                    <Line />
                    <View style={{alignItems: 'center'}}>
                        <Text>42</Text>
                        <Text style={{fontSize: 14}}>最近游览</Text>
                    </View>
                </InfoWrapper>
            </PeopleWrapper>
        </Wrapper>
    )
}

const Wrapper = styled(LinearGradient)`
height: 175px;
border-bottom-left-radius: 35px;
border-bottom-right-radius: 35px;
padding: 10px 15px;
position: relative;
`
const LoginWrapper = styled.View`
align-items: center;
border-bottom-width: 1px;
border-bottom-color: #ebebeb;
padding-bottom: 5px;
margin-bottom: 10px;
`

const Button = styled.Text`
background-color: #0084ff;
color: #fff;
font-size: 16px;
padding: 8px 40px;
border-radius: 5px;
`

const PeopleWrapper = styled.View`
position: absolute;
top: 60px;
left: 15px;
background-color: #fff;
border-radius: 15px;
width: 100%;
padding: 10px;
`

const People = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 10px;
`

const Avatar = styled.Image`
width: 55px;
height: 55px;
border-radius: 30px;
margin-right: 10px;
`

const Text = styled.Text`
color: #1a1a1a;
font-size: 18px;
`

const MinorText = styled.Text`
color: #999;
font-size: 14px;
`
const InfoWrapper = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`
const Line = styled.View`
width: 1px;
height: 20px;
background-color: #ebebeb;
margin: 0 20px;
`

export default Header
