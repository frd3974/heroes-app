import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {HeroStats} from "@/heroes/components/HeroStats.tsx";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls.tsx";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs.tsx";
import {HeroGrid} from "@/heroes/components/HeroGrid.tsx";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router";
import {SearchHeroesAction} from "@/heroes/actions/search-heroes.action.ts";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;

    const {data:dataHeroes = []} = useQuery({
        queryKey: ['search', {name, strength}],
        queryFn: () => SearchHeroesAction({name, strength}),
        staleTime: 1000 * 60 * 5
    });
    return (
        <>
            <CustomJumbotron title='Búsqueda de SuperHéroes' description='Descubre, explora y administra super héroes y villanos'/>
            <CustomBreadcrumbs currentPage='Buscador' breadcrumbs={
                [
                ]
            }/>
            <HeroStats/>
            <SearchControls/>
            <HeroGrid heroes={dataHeroes}/>
        </>
    );
};

export default SearchPage;