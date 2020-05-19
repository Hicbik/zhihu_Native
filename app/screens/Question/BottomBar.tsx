import React, { FC, useState, useImperativeHandle, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import IconSanjiaoxing from '../../components/iconfont/IconSanjiaoxing'
import IconPinglun from '../../components/iconfont/IconPinglun'
import { useTypedSelector } from '../../store/reducer'
import { QuestionRequest } from '../../utils/request'


interface Props {
    cRef?: any,
    num: number,
    like_id: string[],
    no_like_id: string[],
    reply_id: string,
    modalRef: any,
    comment_count: number
}

const BottomBar: FC<Props> = ({
    cRef,
    num,
    like_id,
    no_like_id,
    reply_id,
    modalRef,
    comment_count
}) => {

    const state = useTypedSelector(state => state.User)
    const [show, setShow] = useState(true)
    const [flag, setFlag] = useState('no')
    const [likeCount, setLikeCount] = useState(() => num!)


    useImperativeHandle(cRef, () => ({
        setShow
    }))


    useEffect(() => {
        setFlag('no')
        setLikeCount(num)
    }, [reply_id])

    useEffect(() => {
        setFlag(() => {
            if (like_id.includes(state._id as string)) return 'up'
            else if (no_like_id.includes(state._id as string)) return 'down'
            else return 'no'
        })
    }, [state._id as string, like_id, no_like_id])

    const _onButton = (type: string) => async () => {
        let flagNum: string
        let pType = type
        if (type !== flag && flag !== 'no') flagNum = '1'
        else if (type !== flag && flag === 'no') flagNum = '2'
        else if (type === flag) {
            type = 'no'
            flagNum = '3'
        }
        const res = await QuestionRequest.voters({like: {type: pType, flag: flagNum!}, reply_id})
        if (!res) return
        setFlag(type)
        setLikeCount(res.data.like_count)
    }


    const _onModal = (state: boolean) => () => {
        modalRef.current.onSetModal(state)
    }

    if (!show) return null

    return (
        <Wrapper>
            {
                flag === 'no' ? (
                    <LikeButton>
                        <TouchableOpacity onPress={_onButton('up')}>
                            <View>
                                <IconSanjiaoxing color='#0084ff' size={14} style={{marginTop: 2}} />
                                <Text>赞同 {likeCount}</Text>
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
                    flag === 'up' ? (
                        <LikeButton style={{backgroundColor: '#0084ff'}}>
                            <TouchableOpacity onPress={_onButton('up')}>
                                <View>
                                    <IconSanjiaoxing color='#fff' size={14} style={{marginTop: 2}} />
                                    <Text style={{color: '#fff'}}>赞同 {likeCount}</Text>
                                </View>
                            </TouchableOpacity>
                        </LikeButton>
                    ) : (
                        (
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
padding: 0 17px;
border-top-width: 1px;
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
