import { useEffect, useState } from 'react'

export const useRealTimeDeviceDetector = () => {

    const [IsWeb, setIsWeb] = useState(window.innerWidth >= 1245)
    const [IsTab, setIsTab] = useState(window.innerWidth < 1245 && window.innerWidth >= 768)
    const [IsMob, setIsMob] = useState(window.innerWidth < 768)

    useEffect(() => {

        window.addEventListener("resize", () => {
            setIsWeb(window.innerWidth >= 1245)
            setIsTab(window.innerWidth < 1245 && window.innerWidth >= 768)
            setIsMob(window.innerWidth < 768)


        })
    }, [])

    return { IsWeb, IsTab, IsMob }
}
