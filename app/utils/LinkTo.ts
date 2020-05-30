import { navigation } from './navigation'

export const LinkToQuestion = (props: { _id: string, reply_id: string }) => () => {
    navigation.current.navigate('Question', {
        _id: props._id,
        reply_id: props.reply_id
    })
}

export const LinkToQuestionDeal = (props: { question_id: string }) => {
    navigation.current.navigate('QuestionDeal', {question_id: props.question_id})
}

export const LinkToReplyEdit = (props: { question_id: string, title: string }) => {
    navigation.current.navigate('ReplyEdit', {
        question_id: props.question_id,
        title: props.title
    })
}

export const ListToChatList = (props: { user_id: string }) => {
    navigation.current.navigate('ChatList', {user_id: props.user_id})
}
