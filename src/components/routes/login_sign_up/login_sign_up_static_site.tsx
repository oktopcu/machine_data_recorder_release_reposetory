//import react library components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import custom react components


//import custom react views
import LoginView from "./login/login_view";
import SignUpView from "./sign_up/sign_up_view";


//create and export default login sign up container
export default function LoginSignUp() {
    return (

        <LoginSignUpRouter/>
    );
}

//create router to set correct view
function LoginSignUpRouter() {
    return (
        <Router>
            <Routes>
                <Route
                    path="login"
                    element={<LoginView/>}
                />
                <Route
                    path="signUp"
                    element={<SignUpView/>}
                />
            </Routes>
        </Router>
    );
}
