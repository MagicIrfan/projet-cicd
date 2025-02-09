import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
};
