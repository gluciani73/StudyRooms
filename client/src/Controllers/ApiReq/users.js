import axios from 'axios';
import { URL_BACK } from '../../constants';

export async function createUser(user){
    const data = await axios.post(`${URL_BACK}/users/signup`,user);
    return data;
}
export async function getUsers(){
    const data = await (await axios(`${URL_BACK}/users/`)).data;
    return data;
}