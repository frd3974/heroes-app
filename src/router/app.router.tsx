import {createHashRouter, Navigate} from "react-router";
import {HomePage} from "@/heroes/pages/home/HomePage.tsx";
import {HeroPage} from "@/heroes/pages/hero/HeroPage.tsx";
// import {SearchPage} from "@/heroes/pages/search/SearchPage.tsx";
import {AdminPage} from "@/admin/pages/AdminPage.tsx";
import {HeroesLayout} from "@/heroes/layouts/HeroesLayout.tsx";
import {AdminLayout} from "@/admin/layouts/AdminLayout.tsx";
import {lazy} from "react";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

// export const router = createBrowserRouter([
export const router = createHashRouter([
    {
        path: '/',
        element: <HeroesLayout/>,
        children: [
            {
                // path: '',
                index: true,
                element: <HomePage/>
            },
            {
                path: 'heroes/:idSlug',
                // path: 'heroes',
                element: <HeroPage/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: '*',
                element: <Navigate to='/'/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <AdminPage/>
            }
        ]
    },
]);