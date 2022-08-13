import getDataUser from "../../localStorage";
import axios from '../apiCore'
const localdata = getDataUser()
const baseURL = process.env.REACT_APP_URL_API

/** hàm xử lý lấy thông tin profile
*  sản phẩm của anhtd 5-8
*/
export const apiGetProfile = (myPathName) => new Promise(async (resolve, reject) => {
    try {
        let res = await axios({
            method: 'get',
            url: `${baseURL}/profiles/${myPathName}`,
            mode: 'cors',
            cache: 'no-cache',
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})
/*  Hàm update profile url = base api+/user
            Tạo bởi anhtd 5-8
        */
export const apiUpdateProfile = (data) => new Promise(async (resolve, reject) => {
    try {
        let res = await axios({
            method: 'put',
            url: `${baseURL}/user`,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": `Token ${localdata.token}`,
                data: JSON.stringify(data)
            }
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})