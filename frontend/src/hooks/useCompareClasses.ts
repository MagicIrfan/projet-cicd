import {useFetch} from "./useFetch.ts";
import {useState} from "react";
import {API_URL} from "../config.ts";
import {CompareClass} from "../types/compare-class.model.ts";

export const useCompareClasses = (class1:string, class2:string) => {
    const url = `${API_URL}/classes/compare?class1=${class1}&class2=${class2}`;
    const [trigger, setTrigger] = useState(false);

    const { data: comparedClasses, loading, error } = useFetch<CompareClass>(url, trigger);

    const compareClasses = () => setTrigger((prev) => !prev);

    return { comparedClasses, loading, error, compareClasses };
};
