import { useCallback, useEffect, useState } from "react";

type Cb = () => Promise<unknown>;
export function useLoading(cb: Cb) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>(null);

    const callback = useCallback(async () => {
        try {
            setLoading(true);
            await cb()
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        callback()
    }, [callback])


    return { loading, error }

}