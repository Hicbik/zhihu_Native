import React, { FC, useState, useEffect, useImperativeHandle } from 'react'
import { FlatList, View, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import IconGengduo from '../../components/iconfont/IconGengduo'
import IconZan from '../../components/iconfont/IconZan'
import IconPinglun from '../../components/iconfont/IconPinglun'
import IconSanjiaoxingXia1 from '../../components/iconfont/IconSanjiaoxingXia1'
import { CommentRequest } from '../../utils/request'
import { DiffTime } from '../../utils/time'
import { useTypedSelector } from '../../store/reducer'

interface Props {
    reply_id: string,
    reply_user_id: string,
    onComment: ({name, Father_id, reply_user_id, Child_id}: { name: string, Father_id: string, reply_user_id: string, Child_id?: string }) => any,
    cRef: any
}


const CommentList: FC<Props> = ({reply_id, reply_user_id, onComment, cRef}) => {
    const state = useTypedSelector(state => state.User)

    const [data, setData] = useState<any[]>([])

    useImperativeHandle(cRef, () => ({
        setData: getAjax
    }))

    useEffect(() => {
        getAjax()
    }, [reply_id])

    const getAjax = async () => {
        const res = await CommentRequest.findComment({reply_id})
        setData([...res.data])
    }

    const _onLike = ({comment_id, type}: { comment_id: string, type: string }) => async () => {
        const res = await CommentRequest.Like({comment_id, type})
        if (!res) return
    }

    const ChildComment = ({item, Father_id}: { item: any[], Father_id: string }) => {
        return (
            <ChildCommentWrapper>
                {
                    item.map(value => (
                        <TouchableWithoutFeedback
                            onPress={onComment({
                                name: value.user.nickname,
                                Father_id,
                                Child_id: value._id,
                                reply_user_id: value.user._id
                            })}
                            key={value._id}
                        >
                            <ChildCommentItemWrapper>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <ChildAvatar source={{uri: value.user.avatar}} />
                                    <NickName>
                                        {value.user.nickname} {reply_user_id === value.user._id && '(作者)'}
                                        <IconSanjiaoxingXia1
                                            color='#d4d4d4'
                                            size={12}
                                        />
                                        {value.reply_user_id.nickname} {reply_user_id === value.reply_user_id._id && '(作者)'}
                                    </NickName>
                                    <IconGengduo style={{marginLeft: 'auto'}} color='#999' />
                                </View>
                                <View style={{marginLeft: 30}}>
                                    <Content>{value.comment.content}</Content>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TipsText>{DiffTime(value.comment.create_time)}</TipsText>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 'auto'}}>
                                            <TipsText style={{fontSize: 13, marginRight: 5}}>
                                                {value.comment.like_count}
                                            </TipsText>
                                            <IconZan color='#999' size={15} />
                                        </View>
                                        <IconPinglun color='#999' size={18} style={{marginLeft: 25}} />
                                    </View>
                                </View>
                            </ChildCommentItemWrapper>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ChildCommentWrapper>

        )
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableWithoutFeedback
                // onPress={onComment({
                //     name: item.user_id.nickname,
                //     Father_id: item._id,
                //     reply_user_id: item.user_id._id
                // })}
            >
                <ItemWrapper>
                    <Avatar source={{uri: item.user_id.avatar}} />
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <NickName>{item.user_id.nickname} {reply_user_id === item.user_id._id && '(作者)'}</NickName>
                            <IconGengduo style={{marginLeft: 'auto'}} color='#999' />
                        </View>
                        <Content>{item.content}</Content>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TipsText>{DiffTime(item.create_time)}</TipsText>
                            <TouchableWithoutFeedback
                                onPress={_onLike({
                                    type: item.like_id.includes(state._id) ? 'down' : 'up',
                                    comment_id: item._id
                                })}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 'auto'}}>
                                    <TipsText style={{fontSize: 13, marginRight: 5}}>{item.like_count}</TipsText>
                                    <IconZan color={item.like_id.includes(state._id) ? '#0084ff' : '#999'} size={15} />
                                </View>
                            </TouchableWithoutFeedback>
                            <IconPinglun color='#999' size={18} style={{marginLeft: 25}} />
                        </View>
                        {!!item.Child.length && <ChildComment item={item.Child} Father_id={item._id} />}
                    </View>
                </ItemWrapper>
            </TouchableWithoutFeedback>
        )
    }

    const _keyExtractor = (item: any) => item._id

    return (
        <FlatList
            data={data}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            initialNumToRender={8}
            style={{flex: 1}}
        />
    )
}

const ItemWrapper = styled.View`
padding: 15px 18px;
border-top-width: 1px;
border-top-color: #f6f6f6;
flex-direction: row;
`
const ChildCommentWrapper = styled.View`
margin-top: 10px;
border-top-width: 1px;
border-top-color: #f6f6f6;
`
const ChildCommentItemWrapper = styled.View`
padding: 10px 0;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
`
const ChildAvatar = styled.Image`
width: 20px;
height: 20px;
border-radius: 10px;
margin-right: 10px;
`
const Avatar = styled.Image`
width: 35px;
height: 35px;
border-radius: 17.5px;
margin-right: 10px;
`
const NickName = styled.Text`
color: #1a1a1a;
font-size: 14px;
`
const Content = styled.Text`
color: #444;
font-size: 14px;
margin: 5px 0 15px;
`
const TipsText = styled.Text`
font-size: 12px;
color: #999;
`

export default React.memo(CommentList)
