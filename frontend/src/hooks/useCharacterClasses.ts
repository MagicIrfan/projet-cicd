import {API_URL} from "../config.ts";
import {useFetch} from "./useFetch.ts";

export const useCharacterClasses = () => {
    const url = `${API_URL}/classes`;

    const { data: classnames, loading, error } = useFetch<string[]>(url, false);

    return { classnames, loading, error};
};
