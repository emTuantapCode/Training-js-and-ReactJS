import getDataUser from "../../localStorage";
// import axios from 'axios'
import axios from '../apiCore'
const localdata = getDataUser()
const baseURL = process.env.REACT_APP_URL_API
// import axiosClient from "../apiCore";

/** hàm xử lý lấy thông tin article
   *  sản phẩm của anhtd 3-8
   */

export const apiGetArticle = (pathName) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `${pathName}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

/** hàm xử lý xóa article
   *  sản phẩm của anhtd 3-8
   */
export const apiDeleteArticle = (pathName) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'delete',
            url: `${pathName}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý lấy thông tin your feed Articles
        *  sản phẩm của anhtd 4-8
        */

export const apiGetYourFeed = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `/articles/feed?limit=10&offset=0`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý lấy thông tin global feed Articles
        *  sản phẩm của anhtd 4-8
        */

export const apiGetGlobalFeed = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `/articles?limit=10&offset=0`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý lấy thông tin my Articles
        *  sản phẩm của anhtd 4-8
        */
export const apiGetMyArticle = (customUsername) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `/articles?author=${customUsername}&limit=5&offset=0`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
/** hàm xử lý lấy thông tin my favorite Articles
        *  sản phẩm của anhtd 4-8
        */
export const apiGetMyFavoriteArticle = (customUsername) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: `/articles?favorited=${customUsername}&limit=5&offset=0`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})