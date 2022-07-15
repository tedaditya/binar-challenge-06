import {
    BrowserRouter,
    Routes,
    Route, Navigate,
} from "react-router-dom";
import Cookies from 'js-cookie';
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/user/dashboard/DashboardPage";
import {default as AdminDashboardPage} from "../pages/admin/dashboard/DashboardPage";
import UserMasterLayout from "../layout/UserMasterLayout";
import AdminMasterLayout from "../layout/AdminMasterLayout";

const RouteIndex = () => {
    function useAuth() {
        return Cookies.get('token') === undefined;
    }

    const PrivateRoute = ({children}) => {
        const auth = useAuth()
        return auth ? <Navigate to="/login"/> : children
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/" element={
                        <PrivateRoute>
                            <UserMasterLayout content={<DashboardPage/>}/>
                        </PrivateRoute>
                    }/>
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <AdminMasterLayout content={<AdminDashboardPage/>} />
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteIndex