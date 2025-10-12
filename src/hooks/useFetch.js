import { useEffect, useState } from "react";

function useFetch(url) {
    // console.log(status);
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);

    // let [options, setOptions] = useState(_options);
    // let options = useRef(_options).current;

    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;

        setLoading(true);
        fetch(url, {signal})
            .then(res => {
                if (!res.ok) {
                    throw Error('Something went wrong');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setLoading(false);
            })
            return () => {
                abortController.abort();
            }

        }, [url]);

        return { data , loading, error };

}

export default useFetch;
