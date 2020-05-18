import React, { FC, useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ToastAndroid, Animated, Modal } from 'react-native'
import { useTypedSelector } from '../../store/reducer'
import { Header, Right } from './Header'
import Reply from './Reply'
import NextButton from './NextButton'
import { QuestionRequest } from '../../utils/request'
import CommentModal from './CommentModal'

const Question: FC = () => {

    const navigation = useNavigation()
    const params = useRoute<any>().params
    const state = useTypedSelector(state => state.User)
    const [replyList, setReplyList] = useState<any[]>([])
    const [index, setIndex] = useState(0)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [y] = useState(new Animated.Value(0))

    useEffect(() => {
        ;(async () => {
            navigation.setOptions({
                headerTitle: () => <Header title={params.title} reply_count={params.reply_count} />,
                headerRight: () => <Right />
            })
            const [res1, res2] = await Promise.all([
                QuestionRequest.getReply({question_id: params._id, reply_id: params.reply_id}),
                QuestionRequest.getReplyNin({question_id: params._id, reply_id: params.reply_id, page})
            ])
            setPage(page + 1)
            setReplyList([...res1.data, ...res2.data])
        })()
    }, [params.title, params.reply_count, params._id, params.reply_id])

    const _onNextReply = async () => {
        if (index + 1 === replyList.length) {
            ToastAndroid.show('已经是最后一个回答了哦!', ToastAndroid.SHORT)
            return
        }

        setIndex(index + 1)
        Animated.timing(y, {useNativeDriver: true, toValue: 999, duration: 0}).start(() => {
            Animated.timing(y, {useNativeDriver: true, toValue: 0, duration: 250}).start()
        })


        if (index === (page - 1) * 6) {
            const res = await QuestionRequest.getReplyNin({question_id: params._id, reply_id: params.reply_id, page})
            setReplyList([...replyList, ...res.data])
            setPage(page + 1)
        }
    }

    const _onSetModal = (flag: boolean) => () => {
        setVisible(flag)
    }


    return (
        <>
            <Animated.View style={{flex: 1, backgroundColor: '#fff', position: 'relative', translateY: y}}>
                <Reply
                    replyData={replyList[index]}
                    nextReplyData={index + 1 !== replyList.length && replyList[index + 1]}
                    state={state}
                    onSetModal={_onSetModal}
                />
                <NextButton onPress={_onNextReply} />
            </Animated.View>
            {
                replyList[index] && (
                    <CommentModal
                        visible={visible}
                        onSetModal={_onSetModal}
                        comment_count={replyList[index].comment_count}
                        reply_id={replyList[index]._id}
                        reply_user_id={replyList[index].user_id._id}
                        reply_user_nickname={replyList[index].user_id.nickname}
                        question_id={replyList[index].question_id}
                    />
                )
            }
        </>


    )
}

export default Question
