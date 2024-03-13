import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import route pages
import Home from '../components/routes/home/home_page';
import MachineManagerDefaultPage from "../components/routes/machine_manager/machine_manager_default_page";
import GeneralSettingsPage from "../components/routes/general_settings/general_settings_page";
import HelpCenterPage from "../components/routes/help_center/help_center_page";
import ShopPage from "../components/routes/shop/shop_page";
import PageNotFoundPage from "../components/routes/error/page_not_found_page";
import AccountPage from "../components/routes/account/account_page";

//create router to access different route pages
export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route 
                    index
                    element={<Home/>}
                />
                <Route 
                    path="machineManager"
                    element={<MachineManagerDefaultPage/>}
                />
                <Route
                    path="generalSettings"
                    element={<GeneralSettingsPage/>}
                />
                <Route
                    path="helpCenter"
                    element={<HelpCenterPage/>}
                />
                <Route
                    path="shop"
                    element={<ShopPage/>}
                />
                <Route
                    path="account"
                    element={<AccountPage/>}
                />
                <Route
                    element={<PageNotFoundPage/>}
                />
            </Routes>
        </Router>
    );
}