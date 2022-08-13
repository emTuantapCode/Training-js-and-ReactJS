import getDataUser from "../../localStorage";
import axios from '../apiCore'
const localdata = getDataUser()
const baseURL = process.env.REACT_APP_URL_API

/** hàm xử lý lấy tag login && guest
        *  sản phẩm của anhtd 4-8
        */
export const apiTagLogined = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `/tags`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý lấy thông tin tag
        *  sản phẩm của anhtd 4-8
        */
export const apiTagInfo = (tagIsShow) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `/articles?limit=10&offset=0&tag=${tagIsShow}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})