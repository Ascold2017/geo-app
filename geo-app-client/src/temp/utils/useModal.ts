import { useState } from "react";

export default function useModal() {
    const [isShow, setIsShow] = useState(false);
    return {
        isShow,
        show: () => setIsShow(true),
        hide: () => setIsShow(false)
    }
}