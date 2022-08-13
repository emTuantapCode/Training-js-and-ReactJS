import getDataUser from "../../localStorage";
import axios from '../apiCore'
const localdata = getDataUser()
const baseURL = process.env.REACT_APP_URL_API


/** hàm xử lý get api comment
   *  sản phẩm của anhtd 4-8
   */
export const apiGetComment = (slugComment) => new Promise(async (resolve, reject) => {
    try {
        let res = await axios({
            method: 'get',
            url: `${baseURL}/articles/${slugComment}/comments`,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": `Token ${localdata?.token}`
            }
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

/** hàm xử lý post api comment
   *  sản phẩm của anhtd 4-8
   */
export const apiPostComment = (slug, body) => new Promise(async (resolve, reject) => {
    const data = {
        'comment': {
            "body": body
        }
    }
    try {
        let response = await axios({
            method: 'post',
            url: `${baseURL}/articles/${slug}/comments`,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": `Token ${localdata.token}`
            },
            data: JSON.stringify(data)
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

/** hàm xử lý delete api comment
   *  sản phẩm của anhtd 4-8
   */
export const apiDeleteComment = (slug, id) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'delete',
            url: `/articles/${slug}/comments/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
