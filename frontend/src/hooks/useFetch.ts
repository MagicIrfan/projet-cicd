import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = <T>(url: string, trigger: boolean) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get<T>(url, { cancelToken: source.token })
            .then((response) => setData(response.data))
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError(err.message);
                }
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        };
    }, [url, trigger]);

    return { data, loading, error };
};
