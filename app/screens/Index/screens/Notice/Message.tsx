import React, { FC } from 'react'
import { FlatList, View, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import IconZantong from '../../../../components/iconfont/IconZantong'
import IconGuanzhu from '../../../../components/iconfont/IconGuanzhu'
import IconPinglunShixin from '../../../../components/iconfont/IconPinglunShixin'
import { useTypedSelector } from '../../../../store/reducer'
import { ChatTime } from '../../../../utils/time'
import { ListToChatList } from '../../../../utils/LinkTo'

const Message: FC = () => {

    const state = useTypedSelector(state => state.Notice)

    const LinkTo = (user_id: string) => () => {
        ListToChatList({user_id})
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback onPress={LinkTo(item.user_id)}>
                <ItemWrapper>
                    <Avatar source={{uri: item.avatar}} />
                    <View style={{flex: 1, marginTop: -5}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16}}>{item.nickname}</Text>
                            <Text style={{color: '#bfbfbf'}}>
                                {ChatTime(item.messageList[item.messageList.length - 1].time)}
                            </Text>
                        </View>
                        <MsgText numberOfLines={1}>{item.messageList[item.messageList.length - 1].message}</MsgText>
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const _keyExtractor = (item: any) => item.user_id

    return (
        <Wrapper>
            <Header>
                <View style={{alignItems: 'center'}}>
                    <ButtonView color='#ee315b'>
                        <IconZantong color='#f2f2f2' size={24} />
                    </ButtonView>
                    <Text>赞同</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <ButtonView color='#6b88c0'>
                        <IconGuanzhu color='#f2f2f2' size={28} style={{marginLeft: 7, marginTop: 3}} />
                    </ButtonView>
                    <Text>关注</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <ButtonView color='#22b1f3'>
                        <IconPinglunShixin color='#f2f2f2' size={24} />
                    </ButtonView>
                    <Text>评论</Text>
                </View>
            </Header>
            <FlatList
                data={state.chatList}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        </Wrapper>
    )
}

const Wrapper = styled.View`
background-color: #fff;
`
const Header = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-around;
padding: 20px 0;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
`
const Text = styled.Text`
color: #444;
font-size: 12px;
margin: 5px 0;
`
const ButtonView = styled.View`
align-items: center;
justify-content: center;
border-radius: 50px;
background-color: ${(props: { color: string }) => props.color};
height: 50px;
width: 50px;
`
const ItemWrapper = styled.View`
flex-direction: row;
padding: 15px;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
`
const Avatar = styled.Image`
width: 45px;
height: 45px;
border-radius: 22.5px;
margin-right: 10px;
`
const MsgText = styled.Text`
color: #999;
font-size: 12px;
`
export default Message
