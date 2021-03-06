import React, { FC } from 'react'
import { FlatList, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { Badge } from 'react-native-paper'
import { useTypedSelector } from '../../../../store/reducer'
import { UserRequest } from '../../../../utils/request'
import { ChatTime } from '../../../../utils/time'
import { ListToChatList, LinkToNoticeDeal } from '../../../../utils/LinkTo'
import IconZantong from '../../../../components/iconfont/IconZantong'
import IconGuanzhu from '../../../../components/iconfont/IconGuanzhu'
import IconPinglunShixin from '../../../../components/iconfont/IconPinglunShixin'
import { NoticeIo } from '../../../../utils/io'


const Message: FC = () => {

    const state = useTypedSelector(state => state.Notice)
    const dispatch = useDispatch()


    const LinkTo = (user_id: string) => () => {
        ListToChatList({user_id})
    }

    const _onClearNotice = async () => {
        const res = await UserRequest.ClearNotice()
        if (res.state === 'err') return
        dispatch({type: 'notice/ClearNotice'})
        await NoticeIo.SaveChat()
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
            {
                !!(state.unread + state.chat) && (
                    <ClearView>
                        <Text style={{fontSize: 14, color: '#666'}}>
                            ?????? {state.unread + state.chat} ????????????
                        </Text>
                        <TouchableOpacity onPress={_onClearNotice}>
                            <Text style={{
                                borderColor: '#ddd',
                                borderWidth: 0.5,
                                padding: 3,
                                borderRadius: 3,
                                color: '#666'
                            }}>????????????</Text>
                        </TouchableOpacity>
                    </ClearView>
                )
            }
            <Header>
                <TouchableOpacity onPress={LinkToNoticeDeal({type: '??????'})}>
                    <View style={{alignItems: 'center'}}>
                        <ButtonView color='#ee315b'>
                            <IconZantong color='#f2f2f2' size={24} />
                        </ButtonView>
                        <Text>??????</Text>
                        <HeaderBadge size={18} visible={!!state.full.agree}>{state.full.agree}</HeaderBadge>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={LinkToNoticeDeal({type: '??????'})}>
                    <View style={{alignItems: 'center'}}>
                        <ButtonView color='#6b88c0'>
                            <IconGuanzhu color='#f2f2f2' size={28} style={{marginLeft: 7, marginTop: 3}} />
                            <HeaderBadge size={18} visible={!!state.full.attention}>{state.full.attention}</HeaderBadge>
                        </ButtonView>
                        <Text>??????</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={LinkToNoticeDeal({type: '??????'})}>
                    <View style={{alignItems: 'center'}}>
                        <ButtonView color='#22b1f3'>
                            <IconPinglunShixin color='#f2f2f2' size={24} />
                            <HeaderBadge size={18} visible={!!state.full.news}>{state.full.news}</HeaderBadge>
                        </ButtonView>
                        <Text>??????</Text>
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
const ClearView = styled.View`
padding: 10px 15px;
background-color: #f6f6f6;
align-items: center;
flex-direction: row;
justify-content: space-between;
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
