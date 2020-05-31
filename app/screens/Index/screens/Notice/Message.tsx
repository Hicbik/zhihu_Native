import React, { FC } from 'react'
import { FlatList, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Badge } from 'react-native-paper'
import { useTypedSelector } from '../../../../store/reducer'
import { ChatTime } from '../../../../utils/time'
import { ListToChatList, LinkToNoticeDeal } from '../../../../utils/LinkTo'
import IconZantong from '../../../../components/iconfont/IconZantong'
import IconGuanzhu from '../../../../components/iconfont/IconGuanzhu'
import IconPinglunShixin from '../../../../components/iconfont/IconPinglunShixin'


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
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <MsgText numberOfLines={1}>{item.messageList[item.messageList.length - 1].message}</MsgText>
                            <Badge size={18} visible={!!item.newMsg}>{item.newMsg}</Badge>
                        </View>
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const _keyExtractor = (item: any) => item.user_id

    return (
        <Wrapper>
            <Header>
                <TouchableOpacity onPress={LinkToNoticeDeal({type: '赞同'})}>
                    <View style={{alignItems: 'center'}}>
                        <ButtonView color='#ee315b'>
                            <IconZantong color='#f2f2f2' size={24} />
                        </ButtonView>
                        <Text>赞同</Text>
                        <HeaderBadge size={18} visible={!!state.full.agree}>{state.full.agree}</HeaderBadge>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={LinkToNoticeDeal({type: '关注'})}>
                    <View style={{alignItems: 'center'}}>
                        <ButtonView color='#6b88c0'>
                            <IconGuanzhu color='#f2f2f2' size={28} style={{marginLeft: 7, marginTop: 3}} />
                            <HeaderBadge size={18} visible={!!state.full.attention}>{state.full.attention}</HeaderBadge>
                        </ButtonView>
                        <Text>关注</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={LinkToNoticeDeal({type: '消息'})}>
                    <View style={{alignItems: 'center'}}>
                        <ButtonView color='#22b1f3'>
                            <IconPinglunShixin color='#f2f2f2' size={24} />
                            <HeaderBadge size={18} visible={!!state.full.news}>{state.full.news}</HeaderBadge>
                        </ButtonView>
                        <Text>消息</Text>
                    </View>
                </TouchableOpacity>
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
position: relative;
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
flex: 1;
font-size: 12px;
`
const HeaderBadge = styled(Badge)`
position: absolute;
top: 0;
left: -5px;
border-width: 2px;
border-color: #fff;
`
export default Message
