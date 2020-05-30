import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { View, TouchableOpacity } from 'react-native'
import html from '../../utils/replyhtml'
import IconHuida from '../../components/iconfont/IconHuida'
import IconIconkuZhuanqu from '../../components/iconfont/IconIconkuZhuanqu'
import IconDui from '../../components/iconfont/IconDui'
import { LinkToQuestion, LinkToReplyEdit } from '../../utils/LinkTo'
import { useTypedSelector } from '../../store/reducer'
import { QuestionRequest } from '../../utils/request'

interface Props {
    data: {
        reply_id: any[],
        focus_problem: string[],
        _id: string,
        view_count: number,
        reply_count: number,
        focus_problem_count: number,
        content_html: string,
        topic: string[],
        title: string,
    }
}

const Header: FC<Props> = ({data}) => {

    const state = useTypedSelector(state => state.User)
    const [type, setType] = useState(() => data.focus_problem.includes(state._id!))
    const myReply:any = data.reply_id.find(value => value.user === state._id)

    const Reply = () => {
        if (myReply) {
            LinkToQuestion({_id:data._id,reply_id:myReply.reply})()
            return
        }
        LinkToReplyEdit({question_id: data._id, title: data.title})
    }

    const FocusQuestion = async () => {
        const res = await QuestionRequest.focus({_id: data._id, type: type ? 'down' : 'up'})
        setType(res.data.focus_problem.includes(state._id!))
    }


    return (
        <Wrapper>
            <CenterView>
                {
                    data.topic.map(value => (
                        <Topic key={value}>{value}</Topic>
                    ))
                }
            </CenterView>
            <Title>{data.title}</Title>
            <AutoHeightWebView
                source={{
                    html: html(data.content_html, ``),
                    baseUrl: 'file:///android_asset/web/'
                }}
                scalesPageToFit={false}
                style={{flex: 1}}
            />
            <CenterView style={{marginTop: 20}}>
                <BoldText>{data.focus_problem_count}</BoldText>
                <MinorText>关注</MinorText>
                <MinorText>·</MinorText>
                <BoldText>{data.reply_count}</BoldText>
                <MinorText>评论</MinorText>
                <MinorText>·</MinorText>
                <BoldText>{data.view_count}</BoldText>
                <MinorText>游览</MinorText>
            </CenterView>
            <CenterView
                style={{borderTopWidth: 1, borderTopColor: '#f4f4f4', justifyContent: 'space-around', marginTop: 20}}
            >
                <TouchableOpacity onPress={Reply}>
                    <ButtonView>
                        <IconHuida color='#646464' />
                        <ButtonText>{myReply ? '我的回答' : '写回答'}</ButtonText>
                    </ButtonView>
                </TouchableOpacity>
                <View style={{width: 1, height: '100%', backgroundColor: '#f4f4f4'}} />
                <TouchableOpacity onPress={FocusQuestion}>
                    <ButtonView>
                        {type ? <IconDui color='#646464' /> : <IconIconkuZhuanqu color='#0084ff' />}
                        <ButtonText style={{color: type ? '#646464' : '#0084ff'}}>{type ? '已关注' : '关注问题'}</ButtonText>
                    </ButtonView>
                </TouchableOpacity>
            </CenterView>
        </Wrapper>
    )
}

const Wrapper = styled.View`
background-color: #fff;
padding-top: 15px;
`
const CenterView = styled.View`
align-items: center;
flex-direction: row;
flex-wrap: wrap;
padding: 0 15px;
`
const Topic = styled.Text`
background-color: #f6f6f6;
color: #808080;
border-radius: 5px;
margin-right: 10px;
padding: 6px 12px;
font-size: 14px;
margin-bottom: 10px;
`
const Title = styled.Text`
color: #1a1a1a;
font-size: 20px;
font-weight: bold;
padding: 0 15px;
`
const BoldText = styled.Text`
font-weight: bold;
font-size: 12px;
color: #1a1a1a;
margin-right: 3px;
`
const MinorText = styled.Text`
color: #808080;
font-size: 12px;
`
const ButtonView = styled.View`
align-items: center;
padding: 5px;
width: 120px;
`
const ButtonText = styled.Text`
font-size: 14px;
color: #646464;
margin: 3px;
font-weight: bold;
`

export default React.memo(Header)
