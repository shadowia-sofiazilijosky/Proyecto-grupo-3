import { createBrowserRouter } from 'react-router';
import { RootLayout } from "@/shared/components/layout/RootLayout";
import { HomePage } from "@/pages/home/HomePage";
import { CreateCards } from '@/pages/CreateCards';
import ListCards from '@/pages/ListCards';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: HomePage },
            { path: "createCards", Component: CreateCards },
            { path: "listCards", Component: ListCards },
        ],
    },
]);


