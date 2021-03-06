import React, { FC, useEffect, useRef } from 'react'
import { Dimensions, ScrollView, } from 'react-native'
import styled from 'styled-components/native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import AvararPeople from '../../components/AvararPeople'
import AttentionButton from '../../components/AttentionButton'
import Comment from './Comment'
import html from '../../utils/replyhtml'
import { DiffTime } from '../../utils/time'
import { BlurView } from '@react-native-community/blur'
import Loading from './Loading'
import BottomBar from './BottomBar'
import { LinkToPeople } from '../../utils/LinkTo'

interface Props {
    state: any,
    replyData: any,
    nextReplyData: any,
    modalRef: any,
    BottomBarRef: any,
    likeConfig: any,
    setLikeConfig: any
}


const screenHeight = Math.round(Dimensions.get('window').height)


const Reply: FC<Props> = ({state, replyData, nextReplyData, modalRef, BottomBarRef, likeConfig, setLikeConfig}) => {
    const ref = useRef<any>()
    const viewRef = useRef<any>()

    useEffect(() => {
        ref.current.scrollTo({x: 0, y: 0, animated: true})
    }, [replyData])


    const _onScroll = ({nativeEvent}: any) => {
        const y = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y - viewRef.current.layout.height
        if (y > 0) BottomBarRef.current.setShow(false)
        if (y < 0) BottomBarRef.current.setShow(true)
    }

    const getViewConfig = ({nativeEvent}: any) => {
        viewRef.current = nativeEvent
    }

    const LinkTo = (_id: string) => () => {
        LinkToPeople({_id})
    }

    return (
        <ScrollView style={{flex: 1}} ref={ref} onScroll={_onScroll}>
            {!replyData && <Loading />}
            {
                replyData && (
                    <Wrapper ref={viewRef} onLayout={getViewConfig}>
                        <Top>
                            <AvararPeople
                                avatar={replyData.user_id.avatar}
                                nickname={replyData.user_id.nickname}
                                text={!!replyData.user_id.one_sentence_introduction.length && replyData.user_id.one_sentence_introduction}
                                onPress={LinkTo(replyData.user_id._id)}
                            />
                            <AttentionButton
                                user_id={state._id}
                                people_id={replyData.user_id._id}
                                fans={replyData.user_id.fans}
                            />
                        </Top>
                        <AutoHeightWebView
                            source={{
                                html: html(replyData.content_html, `?????????${DiffTime(replyData.create_time)}??????????????????????????`),
                                baseUrl: 'file:///android_asset/web/'
                            }}
                            scalesPageToFit={false}
                            style={{flex: 1, width: '100%'}}
                        />
                        <Comment
                            state={state}
                            reply_id={replyData._id}
                            comment_count={replyData.comment_count}
                            modalRef={modalRef}
                        />
                        <BottomBar
                            reply_id={replyData._id}
                            modalRef={modalRef}
                            comment_count={replyData.comment_count}
                            borderTop={false}
                            likeConfig={likeConfig}
                            setLikeConfig={setLikeConfig}
                        />
                    </Wrapper>
                )
            }
            {
                nextReplyData && (
                    <NextWrapper>
                        <Top>
                            <AvararPeople
                                avatar={nextReplyData.user_id.avatar}
                                nickname={nextReplyData.user_id.nickname}
                                text={!!nextReplyData.user_id.one_sentence_introduction.length && nextReplyData.user_id.one_sentence_introduction}
                                onPress={LinkTo(nextReplyData.user_id._id)}
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
        </ScrollView>
    )
}


const Wrapper = styled.View`
padding: 15px 0 50px;
flex: 1;
min-height: ${screenHeight}px;
position: relative;
width: 100%;
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

export default React.memo(Reply)
