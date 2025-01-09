import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ReactDOM from "react-dom/client";
import $ from "jquery";
import {NextUIProvider} from "@nextui-org/react";

import "./assets/scss/index.scss";
import FleetOverviewPage from "./assets/pages/FleetOverviewPage.tsx";
import Navigation from "./assets/components/Navigation.tsx";
import ErrorPage from "./assets/pages/ErrorPage.tsx";
import {ThemeProvider} from "./assets/providers/Theme.tsx";
import {SettingsProvider} from "./assets/providers/Settings.tsx";
import MessagesPage from "./assets/pages/MessagesPage.tsx";


ReactDOM.createRoot($("#root")[0]!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <SettingsProvider>
                    <MainContentRenderer/>
                </SettingsProvider>
            </ThemeProvider>
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
                        <Route path="/" element={<FleetOverviewPage/>}/>
                        <Route path="/messages" element={<MessagesPage/>}/>
                        <Route path={"*"} element={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </main>
        </NextUIProvider>
    );
}
