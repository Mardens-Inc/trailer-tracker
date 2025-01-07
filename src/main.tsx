import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ReactDOM from "react-dom/client";
import $ from "jquery";
import {NextUIProvider} from "@nextui-org/react";

import "./assets/scss/index.scss";
import Home from "./assets/pages/Home.tsx";
import Navigation from "./assets/components/Navigation.tsx";
import ErrorPage from "./assets/pages/ErrorPage.tsx";


ReactDOM.createRoot($("#root")[0]!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MainContentRenderer/>
        </BrowserRouter>
    </React.StrictMode>
);

export function MainContentRenderer()
{
    const navigate = useNavigate();
    return (
        <NextUIProvider navigate={navigate}>
            <main className={"flex flex-row h-screen"}>
                <Navigation/>
                <Routes>
                    <Route>
                        <Route path="/" element={<Home/>}/>
                        <Route path={"*"} element={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </main>
        </NextUIProvider>
    );
}
