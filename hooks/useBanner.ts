import { useRouter } from "next/router";

export const useBanner = () => {

    const router = useRouter();

    const handlerRouter = () => {
        router.replace('/menu');
    }

    return {
        handlerRouter
    }

}