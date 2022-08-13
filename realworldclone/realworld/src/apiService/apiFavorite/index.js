import getDataUser from "../../localStorage"
import axios from '../apiCore'
const localdata = getDataUser()
const baseURL = process.env.REACT_APP_URL_API



export const apiPostFavorite = (slug) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'post',
            url: `${baseURL}/articles/${slug}/favorite`,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": `Token ${localdata.token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteFavorite = (slug) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'delete',
            url: `${baseURL}/articles/${slug}/favorite`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
