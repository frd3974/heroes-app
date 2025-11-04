import {useQuery} from "@tanstack/react-query";
import {getHeroesByPageAction} from "@/heroes/actions/get-heroes-by-page.actions.ts";

export const UsePaginatedHero = (page:number ,limit:number, category = 'all') => {
    return useQuery({
        queryKey: ['heroes', {page,limit,category}],
        queryFn: () => getHeroesByPageAction(+page, +limit, category),
        staleTime: 1000 * 60 * 5
    });
};