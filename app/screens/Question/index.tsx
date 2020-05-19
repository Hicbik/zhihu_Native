import React, { FC, useEffect, useRef, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ToastAndroid, Animated } from 'react-native'
import { useTypedSelector } from '../../store/reducer'
import { Header, Right } from './Header'
import Reply from './Reply'
import NextButton from './NextButton'
import { QuestionRequest } from '../../utils/request'
import CommentModal from './CommentModal'
import BottomBar from './BottomBar'

const Question: FC = () => {

    const navigation = useNavigation()
    const params = useRoute<any>().params
    const state = useTypedSelector(state => state.User)
    const [replyList, setReplyList] = useState<any[]>([])
    const [index, setIndex] = useState(0)
    const [page, setPage] = useState(1)
    const [y] = useState(new Animated.Value(0))
    const bottomBar = useRef<any>()
    const modalRef = useRef<any>()

    useEffect(() => {
        ;(async () => {
            const res = await QuestionRequest.findOne({_id: params._id})
            navigation.setOptions({
                headerTitle: () => <Header title={res.data.title} reply_count={res.data.reply_count} />,
                headerRight: () => <Right />
            })
        })()
        ;(async () => {
            const [res1, res2] = await Promise.all([
                QuestionRequest.getReply({question_id: params._id, reply_id: params.reply_id}),
                QuestionRequest.getReplyNin({question_id: params._id, reply_id: params.reply_id, page})
            ])
            setPage(page + 1)
            setReplyList([...res1.data, ...res2.data])
        })()
    }, [params._id, params.reply_id])

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


    return (
        <>
            <Animated.View style={{flex: 1, backgroundColor: '#fff', position: 'relative', translateY: y}}>
                <Reply
                    replyData={replyList[index]}
                    nextReplyData={index + 1 !== replyList.length && replyList[index + 1]}
                    state={state}
                    modalRef={modalRef}
                    BottomBarRef={bottomBar}
                />
                <NextButton onPress={_onNextReply} />
                {
                    replyList[index] && (
                        <BottomBar
                            cRef={bottomBar}
                            like_id={replyList[index].like_id}
                            no_like_id={replyList[index].no_like_id}
                            reply_id={replyList[index]._id}
                            num={replyList[index].like_count}
                            modalRef={modalRef}
                            comment_count={replyList[index].comment_count}
                        />
                    )
                }
            </Animated.View>
            {
                replyList[index] && (
                    <CommentModal
                        cRef={modalRef}
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
