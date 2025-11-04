import {heroApi} from "@/heroes/api/hero.api.ts";
import type {Hero} from "@/heroes/types/hero.interface.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (idSlug:string) => {
    const {data} = await heroApi.get<Hero>(`/${idSlug}`);
    return {
        ...data,
        image: `${BASE_URL}/images/${data.image}`
    };
};