import ajax from './ajax.js';

const BASE = ''

const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

export default reqLogin