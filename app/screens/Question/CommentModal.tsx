import React, { FC, useState, useEffect, useRef } from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { StatusBar, View, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import IconClose from '../../components/iconfont/IconClose'
import CommentList from './CommentList'
import { CommentRequest } from '../../utils/request'

interface Props {
    visible: boolean,
    onSetModal: (flag: boolean) => any,
    comment_count: number,
    reply_id: string,
    reply_user_id: string,
    reply_user_nickname: string,
    question_id: string
}


interface MainProps {
    comment_count: number,
    reply_id: string,
    reply_user_id: string,
    reply_user_nickname: string,
    question_id: string,
    onSetModal: (flag: boolean) => any,
}

const statusBarHeight = StatusBar.currentHeight

const Main: FC<MainProps> = ({
    comment_count,
    reply_id,
    reply_user_id,
    reply_user_nickname,
    question_id,
    onSetModal
}) => {
    const [value, setValue] = useState('')
    const [label, setLabel] = useState({
        text: `评论给 ${reply_user_nickname} (作者)`,
        Father_id: '',
        type: 'father',
        reply_user_id,
        Child_id: ''
    })
    const [focus, setFocus] = useState(false)
    const input = useRef<any>()
    const commentRef = useRef<any>()

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        return () => {
            keyboardDidHideListener.remove()
            console.log(1231313)
        }
    }, [])


    const keyboardDidHide = () => {
        setFocus(false)
        input.current.blur()
        setLabel({
            text: `评论给 ${reply_user_nickname} (作者)`,
            Father_id: '',
            type: 'father',
            reply_user_id,
            Child_id: ''
        })
    }

    const _onComment = ({name, Father_id, reply_user_id, Child_id}: { name: string, Father_id: string, reply_user_id: string, Child_id?: string }) => () => {
        setLabel({
            text: `正在回复 ${name}`,
            Father_id,
            type: 'child',
            reply_user_id,
            Child_id: Child_id!
        })
        input.current.focus()
    }


    const _onButton = async () => {
        const res = await CommentRequest.create({
            reply_id: reply_id,
            question_id: question_id,
            content: value,
            type: label.type,
            Father_id: label.Father_id,
            reply_user_id: label.reply_user_id,
            Child_id: label.Child_id
        })
        if (!res) return
        setValue('')
        commentRef.current.setData()
        input.current.blur()
        setFocus(focus)
    }


    return (
        <Wrapper>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
                <TouchableOpacity onPress={onSetModal(false)}>
                    <IconClose color='#646464' size={22} />
                </TouchableOpacity>
                <Title>全部 {comment_count} 条评论</Title>
            </View>
            <CommentList
                reply_id={reply_id}
                reply_user_id={reply_user_id}
                onComment={_onComment}
                cRef={commentRef}
            />
            <KeyboardAvoidingView behavior='padding' enabled style={{marginTop: 'auto'}}>
                <InputBox style={{marginBottom: focus ? 30 : 0}}>
                    {focus && <Text>{label.text}</Text>}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Input
                            placeholder=' 请输入评论'
                            placeholderTextColor='#bfbfbf'
                            value={value}
                            onChangeText={value => setValue(value)}
                            onBlur={() => setFocus(false)}
                            onFocus={() => setFocus(true)}
                            ref={input}
                        />
                        <TouchableOpacity disabled={!(value.length >= 3)} onPress={_onButton}>
                            <SendText style={{opacity: value.length >= 3 ? 1 : 0.4}}>发布</SendText>
                        </TouchableOpacity>
                    </View>
                </InputBox>
            </KeyboardAvoidingView>

        </Wrapper>
    )
}


const CommentModal: FC<Props> = ({
    visible,
    onSetModal,
    comment_count,
    reply_id,
    reply_user_id,
    reply_user_nickname,
    question_id
}) => {


    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={onSetModal(false)}
            style={{height: 2300, margin: 0}}
            propagateSwipe
            // @ts-ignore
            statusBarTranslucent
            backgroundTransitionOutTiming={0}
        >
            <Main
                comment_count={comment_count}
                reply_id={reply_id}
                reply_user_id={reply_user_id}
                reply_user_nickname={reply_user_nickname}
                question_id={question_id}
                onSetModal={onSetModal}
            />
        </Modal>

    )
}

const Wrapper = styled.View`
flex: 1;
background-color: #fff;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
margin-top: ${statusBarHeight}px;
`
const Title = styled.Text`
color: #646464;
font-weight: bold;
font-size: 20px;
padding-left: 15px;
`

const InputBox = styled.View`
padding: 0 15px;
border-top-width: 1px;
border-top-color: #d3d3d3;
`

const Input = styled.TextInput`
font-size: 17px;
flex: 1;
color: #1a1a1a;
`

const Text = styled.Text`
color: #808080;
font-size: 15px;
margin: 10px 0;
padding-left: 5px;
`

const SendText = styled.Text`
color: #0084ff;
font-size: 16px;
`


export default React.memo(CommentModal)
