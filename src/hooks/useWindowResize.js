import { useEffect, useState } from "react"

const useWindowResize = (width) => {
    const [isVisible, setIsVisible] = useState(window.innerWidth >= width)

    useEffect(()=>{
        const handleResize=()=>{
            setIsVisible(window.innerWidth >= width)
        }
        window.addEventListener("resize", handleResize)
    }, [])
    return isVisible;
}
export default useWindowResize;