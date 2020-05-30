import React, { FC, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { QuestionRequest } from '../../utils/request'
import ReplyList from './ReplyList'


const QuestionDeal: FC = () => {
    const params = useRoute<any>().params
    const [data, setData] = useState<any>({})

    useEffect(() => {
        ;(async () => {
            const res = await QuestionRequest.findOne({_id: params.question_id})
            setData({...res.data})
        })()
    }, [params.question_id])


    return (
        <>
            {data._id && <ReplyList question_id={params.question_id} data={data} />}
        </>
    )
}

export default QuestionDeal
