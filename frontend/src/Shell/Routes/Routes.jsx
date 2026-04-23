import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import MainLayout from "../../Layout/MainLayout";
import FallbackLoader from "../../Components/Comons/FallBackLoader";
import TestPage from "../../Pages/test";

const LoginForm = lazy(() => import("../../Access/Login"));
const Signup = lazy(() => import("../../Pages/SignUp/Signup"));
const Homepage = lazy(() => import("../../Pages/Home/Homepage"));

const Router = () => {
    return (
        <BrowserRouter future={{
            v7_startTransition: true,
        }}>
            <Suspense fallback={<FallbackLoader message={"Loading..."} />}>
                <Routes>
                    {/* <Route path="/" element={<LoginForm />} /> */}
                    <Route path="/" element={<TestPage />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* Nested under MainLayout */}
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/home" element={<Homepage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
