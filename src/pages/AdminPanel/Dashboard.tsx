// pages/admin/Dashboard.tsx

import { Outlet } from 'react-router-dom'; // to render child routes
import Sidebar from "../../components/adminPanel/Sidebar.tsx";
import Navbar from "../../components/layout/Navbar.tsx";
import AdminDashboard from "./AdminDashboard.tsx";

const Dashboard = () => {
    return (
        <div className="relative">
            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            {/* Sidebar and Content */}
            <div className="flex pt-16 h-screen">
                {/* Sidebar */}
                <div className="w-64">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-4 overflow-y-auto">
                    {/* Admin Dashboard Cards Section */}
                    <AdminDashboard /> {/* This will render the cards for the dashboard */}

                    {/* Render the content of the child routes here */}
                    <Outlet /> {/* This is where nested routes will be rendered */}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
