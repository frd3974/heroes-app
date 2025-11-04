import {use, useMemo} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {HeroStats} from "@/heroes/components/HeroStats.tsx";
import {HeroGrid} from "@/heroes/components/HeroGrid.tsx";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs.tsx";
import {useSearchParams} from "react-router";
import {useHeroSummary} from "@/heroes/hooks/useHeroSummary.tsx";
import {UsePaginatedHero} from "@/heroes/hooks/usePaginatedHero.tsx";
import {FavoriteHeroContext} from "@/heroes/context/FavoriteHeroContext.tsx";

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('activeTab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all' , 'favorites' , 'heroes' , 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    },[activeTab]);
    // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');

    const {data:heroesResponse} = UsePaginatedHero(+page, +limit, category);
    const {data:summary} = useHeroSummary();
    const {favoriteCount, favorites} = use(FavoriteHeroContext);

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title='Universo de SuperHéroes' description='Descubre, explora y administra super héroes y villanos'/>
                <CustomBreadcrumbs currentPage='superheroes'/>
                {/* Stats Dashboard */}
                <HeroStats/>

                {/* Controls */}


                {/* Advanced Filters */}


                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {prev.set('activeTab','all');prev.set('category','all');prev.set('page','1'); return prev;})}>All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {prev.set('activeTab','favorites'); return prev;})}>Favorites ({favoriteCount})</TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {prev.set('activeTab','heroes');prev.set('category','hero');prev.set('page','1'); return prev;})}>Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {prev.set('activeTab','villains');prev.set('category','villain');prev.set('page','1'); return prev;})}>Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>
                    <TabsContent value='all'>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
                    </TabsContent>
                    <TabsContent value='favorites'>
                        <HeroGrid heroes={favorites ?? []}/>
                    </TabsContent>
                    <TabsContent value='heroes'>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
                    </TabsContent>
                    <TabsContent value='villains'>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
                    </TabsContent>
                </Tabs>

                {/* Character Grid */}
                {/*<HeroGrid/>*/}

                {/* Pagination */}
                {
                    selectedTab != 'favorites' && (
                        <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>
                    )
                }
            </>
        </>
    )
}
