import getDataUser from "../../localStorage";
import axios from '../apiCore'
const localdata = getDataUser()
const baseURL = process.env.REACT_APP_URL_API

/** hàm xử lý lấy data Article để update
   *  sản phẩm của anhtd 2-8
   */
export const apiGetDataInput = (mySlugTex) => new Promise(async (resolve, reject) => {
    try {
        let res = await axios({
            method: 'get',
            url: `/articles${mySlugTex}`,
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý tạo Article
   *  sản phẩm của anhtd 2-8
   */
export const apiCreateArticle = (data) => new Promise(async (resolve, reject) => {
    try {
        let res = await axios({
            method: 'post',
            url: `/articles`,
            data: JSON.stringify(data)
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý update Article
   *  sản phẩm của anhtd 5-8
   */
export const apiUpdateArticle = (data, mySlugTex) => new Promise(async (resolve, reject) => {
    try {
        let res = await axios({
            method: 'put',
            url: `/articles${mySlugTex}`,
            data: JSON.stringify(data)
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})