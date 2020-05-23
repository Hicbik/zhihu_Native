import React, { FC, useState, useImperativeHandle } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import IconSanjiaoxing from '../../components/iconfont/IconSanjiaoxing'
import IconPinglun from '../../components/iconfont/IconPinglun'
import { QuestionRequest } from '../../utils/request'


interface Props {
    cRef?: any,
    reply_id: string,
    modalRef: any,
    comment_count: number,
    borderTop?: boolean,
    likeConfig: any,
    setLikeConfig: any
}

const BottomBar: FC<Props> = ({
    cRef,
    modalRef,
    comment_count,
    borderTop = true,
    likeConfig,
    setLikeConfig,
    reply_id
}) => {

    const [show, setShow] = useState(true)

    useImperativeHandle(cRef, () => ({
        setShow
    }))

    const _onButton = (type: string) => async () => {
        let flagNum: string
        let pType = type
        if (type !== likeConfig.flag && likeConfig.flag !== 'no') flagNum = '1'
        else if (type !== likeConfig.flag && likeConfig.flag === 'no') flagNum = '2'
        else if (type === likeConfig.flag) {
            type = 'no'
            flagNum = '3'
        }
        const res = await QuestionRequest.voters({like: {type: pType, flag: flagNum!}, reply_id})
        if (res.state === 'err') return

        setLikeConfig({flag: type, likeCount: res.data.like_count})
    }


    const _onModal = (state: boolean) => () => {
        modalRef.current.onSetModal(state)
    }

    if (!show) return null

    return (
        <Wrapper borderTop={borderTop}>
            {
                likeConfig.flag === 'no' ? (
                    <LikeButton>
                        <TouchableOpacity onPress={_onButton('up')}>
                            <View>
                                <IconSanjiaoxing color='#0084ff' size={14} style={{marginTop: 2}} />
                                <Text>赞同 {likeConfig.likeCount}</Text>
                            </View>
                        </TouchableOpacity>
                        <Line />
                        <TouchableOpacity onPress={_onButton('down')}>
                            <View>
                                <IconSanjiaoxing
                                    color='#0084ff'
                                    size={14}
                                    style={{marginTop: -2, transform: [{rotateX: '180deg'}]}}
                                />
                            </View>
                        </TouchableOpacity>
                    </LikeButton>
                ) : (
                    likeConfig.flag === 'up' ? (
                        <LikeButton style={{backgroundColor: '#0084ff'}}>
                            <TouchableOpacity onPress={_onButton('up')}>
                                <View>
                                    <IconSanjiaoxing color='#fff' size={14} style={{marginTop: 2}} />
                                    <Text style={{color: '#fff'}}>赞同 {likeConfig.likeCount}</Text>
                                </View>
                            </TouchableOpacity>
                        </LikeButton>
                    ) : (
                        <LikeButton style={{backgroundColor: '#0084ff'}}>
                            <TouchableOpacity onPress={_onButton('down')}>
                                <View>
                                    <IconSanjiaoxing
                                        color='#fff'
                                        size={14}
                                        style={{marginTop: -2, transform: [{rotateX: '180deg'}]}}
                                    />
                                    <Text style={{color: '#fff'}}>已反对</Text>
                                </View>
                            </TouchableOpacity>
                        </LikeButton>
                    )
                )
            }


            <TouchableOpacity style={{marginLeft: 'auto'}} onPress={_onModal(true)}>
                <CommentBox>
                    <IconPinglun color='#8590a6' size={24} />
                    <CommentText>评论 {comment_count}</CommentText>
                </CommentBox>
            </TouchableOpacity>
        </Wrapper>
    )
}

const Wrapper = styled.View`
position: absolute;
bottom: 0;
left: 0;
height: 50px;
width: 100%;
background-color: #fff;
flex-direction: row;
align-items: center;
padding: 2px 17px;
border-top-width: ${(props: { borderTop: boolean | undefined }) => props.borderTop ? '1px' : '0'};
border-top-color: #ebebeb;
`
const View = styled.View`
flex-direction: row;
align-items: center;
`
const LikeButton = styled.View`
background-color: #ebf5ff;
border-radius: 20px;
height: 35px;
padding: 0 15px;
align-items: center;
flex-direction: row;
`
const Text = styled.Text`
color: #0084ff;
font-size: 13px;
font-weight:bold;
margin-left: 5px;
`
const Line = styled.View`
height: 15px;
width: 1px;
background-color: #c5e0fd;
margin: 0 10px;
`
const CommentBox = styled.View`
align-items: center;
`
const CommentText = styled.Text`
color: #8590a6;
font-size: 11px;
`

export default BottomBar
