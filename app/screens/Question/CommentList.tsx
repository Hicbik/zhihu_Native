import React, { FC, useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components/native'
import IconGengduo from '../../components/iconfont/IconGengduo'
import IconZan from '../../components/iconfont/IconZan'
import IconPinglun from '../../components/iconfont/IconPinglun'
import IconSanjiaoxingXia1 from '../../components/iconfont/IconSanjiaoxingXia1'
import { CommentRequest } from '../../utils/request'
import { DiffTime } from '../../utils/time'

interface Props {
    reply_id: string,
    reply_user_id:string
}


const CommentList: FC<Props> = ({reply_id,reply_user_id}) => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        ;(async () => {
            const res = await CommentRequest.findComment({reply_id})
            setData([...res.data])
        })()
    }, [reply_id])


    const ChildComment = ({item}: { item: any[] }) => {
        return (
            <ChildCommentWrapper>
                {
                    item.map(value => (
                        <ChildCommentItemWrapper key={value._id}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <ChildAvatar source={{uri: value.user.avatar}} />
                                <NickName>
                                    {value.user.nickname} {reply_user_id === value.user._id && '(作者)'}
                                    <IconSanjiaoxingXia1
                                        color='#d4d4d4'
                                        size={12}
                                    />
                                    {value.reply_user_id.nickname} {reply_user_id === value.user._id && '(作者)'}
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

                    ))
                }
            </ChildCommentWrapper>

        )
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
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
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 'auto'}}>
                            <TipsText style={{fontSize: 13, marginRight: 5}}>{item.like_count}</TipsText>
                            <IconZan color='#999' size={15} />
                        </View>
                        <IconPinglun color='#999' size={18} style={{marginLeft: 25}} />
                    </View>
                    {!!item.Child.length && <ChildComment item={item.Child} />}
                </View>
            </ItemWrapper>
        )
    }

    const _keyExtractor = (item: any) => item._id

    return (
        <FlatList data={data} renderItem={_renderItem} keyExtractor={_keyExtractor} />
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
