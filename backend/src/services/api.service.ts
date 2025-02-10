import axios, {AxiosResponse} from 'axios';
import {API_BASE_URL} from "../config";

export const fetchData = async (endpoint : string) : Promise<any> => {
    const url = `${API_BASE_URL}${endpoint}`
    try {
        const response : AxiosResponse<any,any> = await axios.get(url);
        return response.data;
    } catch (error : any) {
        throw new Error(`Error when fetch api on ${url}: ${error.message}`);
    }
}
