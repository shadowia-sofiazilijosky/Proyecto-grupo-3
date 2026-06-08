import { createBrowserRouter } from 'react-router';
import { RootLayout } from "@/shared/components/layout/RootLayout";
import { HomePage } from "@/pages/home/HomePage";
import { CreateCards } from '@/pages/CreateCards';
import ListCards from '@/pages/ListCards';
import StudyCards from '@/pages/flashcards/StudyCards';
import Quiz from '@/pages/quiz/Quiz';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: HomePage },
            { path: "createCards", Component: CreateCards },
            { path: "listCards", Component: ListCards },
            { path: "studyCards", Component: StudyCards },
            { path: "quiz", Component: Quiz },
        ],
    },
]);


