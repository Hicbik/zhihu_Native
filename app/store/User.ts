import { observable, action } from 'mobx'

export interface UserProps {
    isLogin: boolean,
    _id?: string,
    nickname?: string,
    phone?: string,
    gender?: number,
    create_time?: Date,
    avatar?: string,
    one_sentence_introduction?: string,
    introduction?: string,
    question_count?: number,
    comment_count?: number,
    fans_count?: number,
    like_count?: number,
    attention_count?: number,
    attention?: string[]
}


export default class User {
    @observable
    public store: UserProps = {
        isLogin: false
    }

    @action
    public SignIn (res: any) {
        this.store = {
            isLogin: true,
            _id: res._id,
            nickname: res.nickname,
            phone: res.phone,
            gender: res.gender,
            create_time: res.create_time,
            avatar: res.avatar,
            one_sentence_introduction: res.one_sentence_introduction,
            introduction: res.introduction,
            question_count: res.question_count,
            comment_count: res.comment_count,
            fans_count: res.fans_count,
            like_count: res.like_count,
            attention_count: res.attention_count,
            attention: res.attention
        }
        console.log(this.store)
    }
}

