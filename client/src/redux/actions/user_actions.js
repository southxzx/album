import axios from 'axios';
import { USER_SERVER } from '../../component/utils/misc';

export const loginUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
    .then(response => response.data)
}