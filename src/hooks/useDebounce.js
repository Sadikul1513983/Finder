import { useState } from "react";

export default function useDebounce() {
    const [typingTimeout, setTypingTimeout] = useState(null); 

    function debounce(func, wait = 1500) {
        clearTimeout(typingTimeout);
        const timer = setTimeout(() => {
            func();
        }, wait);
        setTypingTimeout(timer);
    }

    return debounce;
}

   