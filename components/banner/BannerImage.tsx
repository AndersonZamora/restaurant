import { useEffect, useState } from 'react';
import { useBanner } from '../../hooks';

export const BannerImage = () => {

    const { handlerRouter } = useBanner();
    const [chamg, setChamg] = useState(false)

    setTimeout(() => {
        setChamg(true)
    }, 3000);

    useEffect(() => {
        if (chamg) {
            handlerRouter();
        }
    }, [chamg])

    return (
        <div className='container animate__animated animate__heartBeat animate__delay-1s'>
            <img
                className='banner-logo'
                src="/images/choza5.png"
                alt="Next.js Logo"
            />
        </div>
    )
}
