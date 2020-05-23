import React, { FC, useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { QuestionRequest } from '../../../../utils/request'
import ReplyButton from './ReplyButton'
import { useTypedSelector } from '../../../../store/reducer'
import IconWenti from '../../../../components/iconfont/IconWenti'
import IconClose from '../../../../components/iconfont/IconClose'
import IconJiahao1 from '../../../../components/iconfont/IconJiahao1'


interface Props {
    setVisible: (state: boolean) => any,
    visible: boolean
}


const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)


const HomeModalMain: FC<Props> = ({setVisible, visible}) => {
    const navigation = useNavigation()
    const state = useTypedSelector(state => state.User)
    const [questionData, setQuestionData] = useState<any[]>([])
    const index = useRef(0)

    useEffect(() => {
        ;(async () => {
            const res = await QuestionRequest.getNoReplyQuestion({user_id: state._id!})
            setQuestionData([...res.data])
        })()
    }, [state._id])

    const _onSnapToItem = (slideIndex: any) => {
        index.current = slideIndex
    }

    const LinkToReply = ({question_id, title}: any) => () => {
        setVisible(false)
        navigation.navigate('ReplyEdit', {question_id, title})
    }

    const LinkToQuestion = () => {
        setVisible(false)
        navigation.navigate('NewQuestion')
    }

    const FocusQuestion = ({_id, type, index}: any) => async () => {

        const res = await QuestionRequest.focus({_id, type})
        setQuestionData(questionData.map(
            (value, i) => i === index ? {...value, focus_problem: [...res.data.focus_problem]} : value)
        )
    }

    const _renderItem = ({item, index}: any) => {

        const type = item.focus_problem.includes(state._id)

        return (
            <TouchableWithoutFeedback onPress={LinkToReply({question_id: item._id, title: item.title})}>
                <QuestionItem>
                    <View style={{padding: 20, alignContent: 'center', marginTop: 80}}>
                        <Text style={{fontSize: 36, color: '#ebebeb', fontWeight: 'bold'}}>“</Text>
                        <Text style={{fontSize: 20, color: '#1a1a1a', marginTop: -20}}>{item.title}</Text>
                        <Text style={{fontSize: 14, color: '#bfbfbf', marginTop: 10}}>
                            {item.focus_problem_count} 人关注·{item.reply_count} 个回答
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 'auto', paddingLeft: 20}}>
                        <Avatar source={{uri: item.user_id.avatar}} />
                        <Text>{item.user_id.nickname}</Text>
                        <TouchableWithoutFeedback
                            onPress={FocusQuestion({
                                _id: item._id,
                                type: type ? 'down' : 'up',
                                index
                            })}
                        >
                            <LikeWrapper type={type}>
                                {!type && <IconJiahao1 color='#0084ff' size={16} />}
                                <Text style={{color: type ? '#fff' : '#0084ff', fontSize: 14, marginLeft: 8}}>
                                    {type ? '已关注' : '关注问题'}
                                </Text>
                            </LikeWrapper>
                        </TouchableWithoutFeedback>
                    </View>
                </QuestionItem>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Wrapper>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <IconClose size={36} color='#d3d3d3' style={{alignSelf: 'center'}} />
                </TouchableWithoutFeedback>
                <View style={{padding: 15, marginBottom: 20}}>
                    <TopBox>
                        <Avatar source={{uri: state.avatar}} />
                        <Text style={{fontSize: 14, color: '#808080'}}>今天是你加入知乎的第1170天</Text>
                    </TopBox>
                   <TouchableWithoutFeedback onPress={LinkToQuestion}>
                       <QuestionBox style={{elevation: 10}}>
                           <IconWenti size={18} style={{marginRight: 10}} />
                           <Text style={{fontSize: 14, color: '#808080'}}>提个问题</Text>
                       </QuestionBox>
                   </TouchableWithoutFeedback>
                </View>
                {
                    !!questionData.length && (
                        <>
                            <View style={{alignItems: 'center', paddingBottom: 10}}>
                                <Carousel
                                    data={questionData}
                                    renderItem={_renderItem}
                                    layout='stack'
                                    sliderWidth={width}
                                    itemWidth={width * 0.85}
                                    onSnapToItem={_onSnapToItem}
                                    firstItem={questionData.length - 1}
                                />
                            </View>
                            <View style={{marginTop: 15}}>
                                <ReplyButton
                                    question_id={questionData[index.current]._id}
                                    title={questionData[index.current].title}
                                    setVisible={setVisible}
                                />
                            </View>
                        </>
                    )
                }
            </Wrapper>
        </ScrollView>
    )
}

const Wrapper = styled.View`
flex: 1;
padding: 50px 15px 15px;
`
const TopBox = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 30px;
`
const Avatar = styled.Image`
width: 25px;
height: 25px;
border-radius: 12.5px;
margin-right: 5px;
`
const QuestionBox = styled.View`
border-radius: 10px;
background-color: #fff;
height: 45px;
align-items: center;
flex-direction: row;
padding: 0 15px;
`
const QuestionItem = styled.View`
background-color: #fff;
border-radius: 10px;
overflow: hidden;
height: 400px;
border-width: 2px;
border-color: #f6f6f6;
`
const LikeWrapper = styled.View`
background-color: ${(props: { type: any }) => props.type ? '#8590a6' : '#ebf5ff'};
border-top-left-radius: 10px;
padding: 20px 0;
width: 110px;
justify-content: center;
margin-left: auto;
flex-direction: row;
align-items: center;
`


export default HomeModalMain
