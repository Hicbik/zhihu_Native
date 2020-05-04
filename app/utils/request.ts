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


export class QuestionRequest {
    static url = 'question/'


    static RecommendList ({page, type}: { page: number, type?: string  }) {
        return axios.get(this.url + 'RecommendList', {params: {page, type}})
    }


}


