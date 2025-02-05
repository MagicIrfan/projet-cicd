import axios, {AxiosResponse} from 'axios';

export const fetchData = async (url : string) : Promise<any> => {
    try {
        const response : AxiosResponse<any,any> = await axios.get(url);
        return response.data;
    } catch (error : any) {
        throw new Error(`Error when fetch api on ${url}: ${error.message}`);
    }
}
