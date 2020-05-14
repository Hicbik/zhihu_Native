import React, { FC, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { QuestionRequest } from '../../utils/request'
import AvararPeople from '../../components/AvararPeople'
import AttentionButton from '../../components/AttentionButton'
import Comment from './Comment'
import html from '../../utils/replyhtml'
import { DiffTime } from '../../utils/time'
import { BlurView } from '@react-native-community/blur'

interface Props {
    question_id: string,
    state: any
}

const Reply: FC<Props> = ({question_id, state}) => {
    const [data, setData] = useState<any>({})

    useEffect(() => {
        ;(async () => {
            const res = await QuestionRequest.getReply({question_id})
            setData({...res.data[0]})
        })()
    }, [question_id])


    const _onScrollBeginDrag = () => {
        console.log(1)
    }

    if (!data._id) return null

    return (
        <ScrollView style={{flex: 1}} onScrollBeginDrag={_onScrollBeginDrag}>
            <Wrapper>
                <Top>
                    <AvararPeople
                        avatar={data.user_id.avatar}
                        nickname={data.user_id.nickname}
                        text={!!data.user_id.one_sentence_introduction.length && data.user_id.one_sentence_introduction}
                    />
                    <AttentionButton user_id={state._id} people_id={data.user_id._id} fans={data.user_id.fans} />
                </Top>
                <AutoHeightWebView
                    source={{
                        html: html(data.content_html, `发布于${DiffTime(data.create_time)}·著作权归作者所有`),
                        baseUrl: 'file:///android_asset/web/'
                    }}
                    scalesPageToFit={false}
                    style={{flex: 1}}
                />
            </Wrapper>
            <Comment state={state} />
            <NextWrapper>
                <Top>
                    <AvararPeople
                        avatar={data.user_id.avatar}
                        nickname={data.user_id.nickname}
                        text={!!data.user_id.one_sentence_introduction.length && data.user_id.one_sentence_introduction}
                    />
                    <AttentionButton user_id={state._id} people_id={data.user_id._id} fans={data.user_id.fans} />
                </Top>
                <AutoHeightWebView
                    source={{
                        html: html(data.content_html, ``),
                        baseUrl: 'file:///android_asset/web/'
                    }}
                    scalesPageToFit={false}
                    style={{flex: 1}}
                />
                <BlurView
                    style={{position: 'absolute', bottom: 0, right: 0, width: '100%', height: 25, opacity: 0.9}}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
            </NextWrapper>
        </ScrollView>

    )
}


const Wrapper = styled.View`
padding: 15px 0;
flex: 1;
min-height: 500px;
`

const Top = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 10px;
padding: 0 15px;
`
const NextWrapper = styled.View`
border-top-width: 15px;
border-top-color: #f6f6f6;
padding: 15px 0;
height: 170px;
overflow: hidden;
position: relative;
`

export default Reply
