import axios from 'axios'


axios.defaults.baseURL = 'http://192.168.31.218:7001/'

axios.interceptors.request.use(
    config => {
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


export class UserRequest {
    static url = 'user/'

    static signUp ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signUp', {phone, password})
    }

    static signIn ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signIn', {phone, password})
    }


}


export class QuestionRequest {
    static url = 'question/'


    static RecommendListData ({page}: { page: number }) {
        return axios.get(this.url + 'RecommendListData', {params: {page}})
    }


}


