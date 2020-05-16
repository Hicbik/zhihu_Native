import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import IconDianzan11Copy from '../../components/iconfont/IconDianzan11Copy'
import { CommentRequest } from '../../utils/request'

interface Props {
    state: any,
    reply_id: string,
    comment_count:number
}

const Comment: FC<Props> = ({state, reply_id,comment_count}) => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        ;(async () => {
            const res = await CommentRequest.featuredComment({reply_id})
            setData([...res.data])
        })()
    }, [reply_id])

    return (
        <Wrapper>
            <Title>评论</Title>
            {
                data.map(value => (
                    <ItemWrapper key={value._id}>
                        <View>
                            <Avatar source={{uri: value.user_id.avatar}} />
                            <Text>{value.user_id.nickname}</Text>
                            <View style={{marginLeft: 'auto'}}>
                                <IconDianzan11Copy color='#999' size={14} style={{marginRight: 5}} />
                                <Text>{value.like_count}</Text>
                            </View>
                        </View>
                        <Content numberOfLines={2}>{value.content}</Content>
                    </ItemWrapper>
                ))
            }

            <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 35, marginTop: 5, marginBottom: 15}}>
                查看全部 {comment_count} 条评论
            </Text>
            <View>
                <Avatar source={{uri: state.avatar}} />
                <InputWrapper>
                    <Text style={{fontSize: 15}}>添加评论...</Text>
                </InputWrapper>
            </View>
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
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
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
const View = styled.View`
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
