import React, { FC, useState, useEffect } from 'react'
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import IconDianzan11Copy from '../../components/iconfont/IconDianzan11Copy'
import { CommentRequest } from '../../utils/request'


interface Props {
    state: any,
    reply_id: string,
    comment_count: number,
    onSetModal: (flag: boolean) => any
}

const Comment: FC<Props> = ({state, reply_id, comment_count,onSetModal}) => {

    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const res = await CommentRequest.featuredComment({reply_id})
            setData([...res.data])
            setLoading(false)
        })()
    }, [reply_id])


    const Loging = () => {
        return (
            <Placeholder Animation={Fade}>
                <ItemWrapper style={{flexDirection: 'row'}}>
                    <PlaceholderMedia style={{borderRadius: 12.5, width: 25, height: 25}} />
                    <View style={{flex: 1, marginLeft: 12, flexDirection: 'column', alignItems: 'flex-start'}}>
                        <PlaceholderLine width={15} />
                        <PlaceholderLine width={80} />
                    </View>
                </ItemWrapper>
                <ItemWrapper style={{flexDirection: 'row'}}>
                    <PlaceholderMedia style={{borderRadius: 12.5, width: 25, height: 25}} />
                    <View style={{flex: 1, marginLeft: 12, flexDirection: 'column', alignItems: 'flex-start'}}>
                        <PlaceholderLine width={15} />
                        <PlaceholderLine width={80} />
                    </View>
                </ItemWrapper>
            </Placeholder>
        )
    }

    return (
        <Wrapper>
            <Title>评论</Title>
            {loading && <Loging />}
            {
                data.map(value => (
                    <ItemWrapper key={value._id}>
                        <CenterView>
                            <Avatar source={{uri: value.user_id.avatar}} />
                            <Text>{value.user_id.nickname}</Text>
                            <CenterView style={{marginLeft: 'auto'}}>
                                <IconDianzan11Copy color='#999' size={14} style={{marginRight: 5}} />
                                <Text>{value.like_count}</Text>
                            </CenterView>
                        </CenterView>
                        <Content numberOfLines={2}>{value.content}</Content>
                    </ItemWrapper>
                ))
            }
            {
                !!comment_count && (
                    <TouchableOpacity onPress={onSetModal(true)}>
                        <Text
                            style={{fontWeight: 'bold', fontSize: 16, marginLeft: 35, marginTop: 5, marginBottom: 15}}
                        >
                            查看全部 {comment_count} 条评论
                        </Text>
                    </TouchableOpacity>

                )
            }
            <CenterView>
                <Avatar source={{uri: state.avatar}} />
                <InputWrapper>
                    <Text style={{fontSize: 15}}>添加评论...</Text>
                </InputWrapper>
            </CenterView>
        </Wrapper>
    )
}


const Wrapper = styled.View`
padding: 15px;
`
const Title = styled.Text`
color: #1a1a1a;
font-size: 18px;
font-weight: bold;
margin-bottom: 15px;
padding: 10px 0;
`
const Avatar = styled.Image`
width: 25px;
height: 25px;
border-radius: 20px;
margin-right: 10px;
`
const ItemWrapper = styled.View`
margin-bottom: 10px;
`
const CenterView = styled.View`
flex-direction: row;
align-items: center;
`
const Text = styled.Text`
color: #999;
`
const Content = styled.Text`
color: #444;
font-size: 14px;
padding-left: 35px;
`
const InputWrapper = styled.View`
border-radius: 20px;
border-width: 1px;
border-color: #ebebeb;
flex: 1;
height: 30px;
justify-content: center;
padding: 0 15px;
`
export default Comment
