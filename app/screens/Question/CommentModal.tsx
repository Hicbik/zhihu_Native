import React, { FC } from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { StatusBar, View, TouchableOpacity } from 'react-native'
import IconClose from '../../components/iconfont/IconClose'
import CommentList from './CommentList'

interface Props {
    visible: boolean,
    onSetModal: (flag: boolean) => any,
    comment_count: number,
    reply_id:string,
    reply_user_id:string
}

const statusBarHeight = StatusBar.currentHeight


const CommentModal: FC<Props> = ({
    visible,
    onSetModal,
    comment_count,
    reply_id,
    reply_user_id
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
            <Wrapper>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
                    <TouchableOpacity onPress={onSetModal(false)}>
                        <IconClose color='#646464' size={22} />
                    </TouchableOpacity>
                    <Title>全部 {comment_count} 条评论</Title>
                </View>
                <CommentList reply_id={reply_id} reply_user_id={reply_user_id}/>
            </Wrapper>
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

export default React.memo(CommentModal)
