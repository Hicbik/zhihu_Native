import React, { FC, useEffect, useRef } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import AvararPeople from '../../components/AvararPeople'
import AttentionButton from '../../components/AttentionButton'
import Comment from './Comment'
import html from '../../utils/replyhtml'
import { DiffTime } from '../../utils/time'
import { BlurView } from '@react-native-community/blur'
import Loading from './Loading'

interface Props {
    state: any,
    replyData: any,
    nextReplyData: any,
    onSetModal: (flag: boolean) => any
}


const screenHeight = Math.round(Dimensions.get('window').height)


const Reply: FC<Props> = ({state, replyData, nextReplyData,onSetModal}) => {
    const ref = useRef<any>()

    useEffect(() => {
        ref.current.scrollTo({x: 0, y: 0, animated: true})
    }, [replyData])

    const NextReply = () => {
        if (!nextReplyData) return null
        return (
            <NextWrapper>
                <Top>
                    <AvararPeople
                        avatar={nextReplyData.user_id.avatar}
                        nickname={nextReplyData.user_id.nickname}
                        text={!!nextReplyData.user_id.one_sentence_introduction.length && nextReplyData.user_id.one_sentence_introduction}
                    />
                    <AttentionButton
                        user_id={state._id}
                        people_id={nextReplyData.user_id._id}
                        fans={nextReplyData.user_id.fans}
                    />
                </Top>
                <AutoHeightWebView
                    source={{
                        html: html(nextReplyData.content_html, ``),
                        baseUrl: 'file:///android_asset/web/'
                    }}
                    scalesPageToFit={false}
                    style={{flex: 1}}
                />
                <BlurView
                    style={{position: 'absolute', bottom: 0, right: 0, width: '100%', height: 25, opacity: 0.9}}
                    blurType="light"
                    blurAmount={8}
                    reducedTransparencyFallbackColor="white"
                />
            </NextWrapper>
        )
    }

    return (
        <ScrollView style={{flex: 1}} ref={ref}>
            {!replyData && <Loading />}
            {
                replyData && (
                    <Wrapper>
                        <Top>
                            <AvararPeople
                                avatar={replyData.user_id.avatar}
                                nickname={replyData.user_id.nickname}
                                text={!!replyData.user_id.one_sentence_introduction.length && replyData.user_id.one_sentence_introduction}
                            />
                            <AttentionButton
                                user_id={state._id}
                                people_id={replyData.user_id._id}
                                fans={replyData.user_id.fans}
                            />
                        </Top>
                        <AutoHeightWebView
                            source={{
                                html: html(replyData.content_html, `发布于${DiffTime(replyData.create_time)}·著作权归作者所有`),
                                baseUrl: 'file:///android_asset/web/'
                            }}
                            scalesPageToFit={false}
                            style={{flex: 1}}
                        />
                        <Comment
                            state={state}
                            reply_id={replyData._id}
                            comment_count={replyData.comment_count}
                            onSetModal={onSetModal}
                        />
                    </Wrapper>
                )
            }
            <NextReply />
        </ScrollView>
    )
}


const Wrapper = styled.View`
padding: 15px 0;
flex: 1;
min-height: ${screenHeight}px;
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
