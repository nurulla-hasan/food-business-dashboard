import Sidebar from "@/components/main-layout/Sidebar";
import Topbar from "@/components/main-layout/Topbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-sidebar">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col">
                <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main
                    className="flex-1 p-4 overflow-y-auto mt-20 min-h-[calc(100vh-80px)] lg:rounded-tl-lg bg-background overflow-hidden lg:ml-64"
                    onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
                    <Outlet />
                </main>
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
        </div>
    );
};

export default MainLayout;
