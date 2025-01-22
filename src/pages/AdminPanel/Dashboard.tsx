// pages/admin/Dashboard.tsx

import {Outlet} from 'react-router-dom'; // to render child routes
import Sidebar from "../../components/adminPanel/Sidebar.tsx";
import Navbar from "../../components/layout/Navbar.tsx";
import AdminDashboard from "./AdminDashboard.tsx";
import Footer from "../../components/layout/Footer.tsx";

const Dashboard = () => {
    return (
        <div className="">
            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar/>
            </div>

            {/* Sidebar and Content */}
            <div className="pt-16 h-screen flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-64">
                    <Sidebar/>
                </div>

                {/* Main Content */}
                <main className="flex-1 p-4 overflow-y-auto py-10 ">
                    {/* Admin Dashboard Cards Section */}
                    <AdminDashboard/> {/* This will render the cards for the dashboard */}

                    {/* Render the content of the child routes here */}
                    <div className="py-10">
                        <Outlet/> {/* This is where nested routes will be rendered */}

                    </div>
                </main>
            </div>
            <div>
                <Footer/>
            </div>

        </div>
    );
};

export default Dashboard;
