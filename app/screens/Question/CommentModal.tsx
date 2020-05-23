import React, { FC, useState,useImperativeHandle } from 'react'
import Modal from 'react-native-modal'
import CommentModalMain from './CommentModalMain'


interface Props {
    cRef: any,
    comment_count: number,
    reply_id: string,
    reply_user_id: string,
    reply_user_nickname: string,
    question_id: string
}

const CommentModal: FC<Props> = ({
    cRef,
    comment_count,
    reply_id,
    reply_user_id,
    reply_user_nickname,
    question_id
}) => {

    const [visible, setVisible] = useState(false)

    useImperativeHandle(cRef, () => ({
        onSetModal: setVisible
    }))

    const onSetModal = (state: boolean) => () => {
        setVisible(state)
    }

    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={onSetModal(false)}
            style={{margin: 0, zIndex: 666}}
            propagateSwipe
            coverScreen={false}
        >
            <CommentModalMain
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


export default React.memo(CommentModal)
