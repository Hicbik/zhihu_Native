import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { ToastAndroid } from 'react-native'
import { LinkToSingIn } from './navigation'
import store from '../store'

axios.defaults.baseURL = 'http://sujie.ink:7001/'

axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        return response.data
    }
)


export class Base {
    static No_Login (callBack: () => any) {
        const {User} = store.getState()
        if (!User.isLogin) {
            ToastAndroid.show('亲,你还没有登录呢!', ToastAndroid.SHORT)
            LinkToSingIn()
            return {
                state: 'err'
            }
        }
        return callBack()
    }
}


export class UserRequest extends Base {
    static url = 'user/'


    static async uploadToken () {
        const res: any = await axios.get('/qiniutoken')
        if (res.state === 'err') return await AsyncStorage.removeItem('qiniuToken')
        await AsyncStorage.setItem('qiniuToken', res.qiniuToken)
    }

    static async Token () {

        const userToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if (!token) return
            const res: any = await axios.post(this.url + 'Token')
            if (res.state === 'err' || !res.data) return await AsyncStorage.removeItem('token')
            store.dispatch({
                type: 'user/signIn',
                value: {...res.data}
            })
        }
        await Promise.all([
            userToken(),
            this.uploadToken()
        ])
    }


    static signUp ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signUp', {phone, password})
    }

    static signIn ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signIn', {phone, password})
    }

    static people ({_id}: { _id: string }): any {
        return axios.get(this.url + 'people', {params: {_id}})
    }

    static getDynamicApp ({user_id, page}: { user_id: string, page: number }) {
        return axios.get(this.url + 'getDynamicApp', {params: {user_id, page}})
    }

    static getAttentionPeople ({_id, page}: { _id: string, page: number, type?: string }) {
        return axios.get(this.url + 'getAttentionPeople', {params: {_id, page}})
    }

    static getFansPeople ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'getFansPeople', {params: {_id, page}})
    }

    static attention ({_id, type}: { _id: string, type: string }) {
        return this.No_Login(() => (
            axios.get(this.url + 'attention', {params: {_id, type}})
        ))
    }

    static getDynamic ({user_id, page}: { user_id: string, page: number }) {
        return axios.get(this.url + 'getDynamic', {params: {user_id, page}})
    }

    static getNotice ({type, page}: { type: string, page: number }) {
        return axios.get(this.url + 'getNotice', {params: {type, page}})
    }

    static getNoticeDynamic ({page}: { page: number }) {
        return axios.get(this.url + 'getNoticeDynamic', {params: {page}})
    }

    static ClearNotice () {
        return this.No_Login(() => {
            return axios.get(this.url + 'ClearNotice')
        })
    }


    static search ({page, search}: { page: number, search: string }) {
        return axios.get(this.url + 'search', {params: {page, search}})
    }

    static Edit ({nickname, one_sentence_introduction, gender, introduction, avatar}: { nickname: string, one_sentence_introduction: string, gender: string, introduction: string, avatar?: string }) {
        return this.No_Login(() => (
            axios.post(this.url + 'Edit', {
                nickname,
                one_sentence_introduction,
                gender,
                introduction,
                avatar
            })
        ))
    }

}


export class QuestionRequest extends Base {
    static url = 'question/'


    static HotList ({page, type}: { page: number, type: string }) {
        return axios.get(this.url + 'HotList', {params: {page, type}})
    }

    static focus ({_id, type}: { _id: string, type: string }) {
        return this.No_Login(() => (
            axios.get(this.url + 'focus', {params: {_id, type}})
        ))
    }

    static getNoReplyQuestion ({user_id}: { user_id: string }) {
        return axios.get(this.url + 'getNoReplyQuestion', {params: {user_id}})
    }

    static create ({title, content, content_html, topic, image_field}: { title: string, content: string, content_html: string, topic: string[], image_field: any[] }) {
        return this.No_Login(() => (
            axios.post(this.url + 'create', {title, content, content_html, topic, image_field})
        ))
    }

    static createReplay ({content, content_html, question_id, image_field}: { content: string, content_html: string, question_id: string, image_field: any[] }) {
        return this.No_Login(() => (
            axios.post(this.url + 'createReply', {content, content_html, question_id, image_field})
        ))
    }


    static RecommendListData ({page}: { page: number }) {
        return axios.get(this.url + 'RecommendListData', {params: {page}})
    }

    static PeopleReply ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'PeopleReply', {params: {_id, page}})
    }

    static PeopleQuestion ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'PeopleQuestion', {params: {_id, page}})
    }

    static findOne ({_id}: { _id: string | undefined }) {
        return axios.get(this.url + 'findOne', {params: {_id}})
    }

    static getReply ({question_id, reply_id, page}: { question_id: string | undefined, reply_id?: string, page: number }) {
        return axios.get(this.url + 'getReply', {params: {question_id, reply_id, page}})
    }

    static getReplyNin ({question_id, reply_id, page}: { question_id: string, reply_id: string, page: number }) {
        return axios.get(this.url + 'getReplyNin', {params: {question_id, reply_id, page}})
    }


    static voters ({like, reply_id}: { like: { flag: string, type: string }, reply_id: string, }) {
        return this.No_Login(() => (
            axios.post(this.url + 'voters', {like, reply_id})
        ))
    }

    static searchList ({search, page}: { search: string, page: number }) {
        return axios.get(this.url + 'searchList', {params: {page, search}})
    }

    static PeopleAttentionReply ({attentionList, page}: { attentionList: string[], page: number }) {
        return axios.post(this.url + 'PeopleAttentionReply', {page, attentionList})
    }


}


export class CommentRequest extends Base {
    static url = 'comment/'

    static Like ({comment_id, type}: { comment_id: string, type: string }) {
        return this.No_Login(() => (
            axios.post(this.url + 'Like', {comment_id, type})
        ))
    }

    static featuredComment ({reply_id}: { reply_id: string }) {
        return axios.get(this.url + 'featuredComment', {params: {reply_id}})
    }

    static findComment ({reply_id}: { reply_id: string }) {
        return axios.get(this.url + 'findComment', {params: {reply_id}})
    }

    static create ({question_id, reply_id, content, type, Father_id, reply_user_id, Child_id}: { question_id: string, reply_id: string, content: string, type: string, Father_id: string, reply_user_id?: string, Child_id?: string }) {
        return this.No_Login(() => (
            axios.post(this.url + 'create', {
                question_id,
                reply_id,
                content,
                type,
                Father_id,
                reply_user_id,
                Child_id
            })
        ))
    }


}

export class LeaveMessageRequest extends Base {
    static url = 'leaveMessage/'

    static getData ({page}: { page: number }) {
        return axios.get(this.url + 'getData', {params: {page}})
    }

    static create ({content}: { content: string }) {
        return this.No_Login(() => {
            return axios.get(this.url + 'create', {params: {content}})
        })
    }

    static like ({type, _id}: { type: string, _id: string }) {
        return this.No_Login(() => {
            return axios.get(this.url + 'like', {params: {type, _id}})
        })
    }
}
