import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

const BASE = ''

export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')


export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })

export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')

export const reqUpdateCategory = ( categoryId, categoryName ) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })


export const reqUsers = () => ajax(BASE + '/manage/user/list')

export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', { userId }, 'POST')

export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')