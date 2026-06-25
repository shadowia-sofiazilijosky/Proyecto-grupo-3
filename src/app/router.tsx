import { createBrowserRouter } from 'react-router-dom';
// Nota: Si el error de RootLayout persiste, borra esto, escribe @/shared/ 
// y usa Ctrl + Espacio para elegir el archivo correcto.
import { RootLayout } from "../shared/components/layout/RootLayout"; 
import { HomePage } from "@/pages/home/HomePage";
import { CreateCards } from '@/pages/createCard/CreateCards';
import ListCards from "@/pages/ListCards/ListCards";
import StudyCards from '../pages/flashcards/StudyCards';
import Quiz from '../pages/quiz/Quiz';
import ProgressPage from '../pages/progress/ProgressPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "createCards", element: <CreateCards /> },
            { path: "listCards", element: <ListCards /> },
            { path: "studyCards", element: <StudyCards /> },
            { path: "quiz", element: <Quiz /> },
            { path: "progress", element: <ProgressPage /> },
        ],
    },
]);