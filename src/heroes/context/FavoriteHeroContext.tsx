import {createContext, type PropsWithChildren, useEffect, useState} from "react";
import type {Hero} from "@/heroes/types/hero.interface.ts";

interface FavoriteHeroContext{
    favorites: Hero[];
    favoriteCount: number;

    isFavorite: (hero:Hero) => boolean;
    toggleFavorite: (hero:Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({children}:PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const isFavorite = (hero:Hero) => {
        return favorites.some(h => h.id == hero.id);
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (hero:Hero) => {
        const heroExist = favorites.find(h => h.id == hero.id);
        if(heroExist){
            setFavorites(favorites.filter(h => h.id != hero.id));
            return;
        }
        setFavorites([...favorites, hero]);
    }
    return (
        <FavoriteHeroContext value={{
            favorites,
            favoriteCount: favorites.length,
            isFavorite,
            toggleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    );
};