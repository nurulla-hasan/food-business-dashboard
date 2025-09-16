import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
    LayoutGrid, Settings, LogOut, ChevronDown,
    ListOrdered,
    CircleDollarSign,
    UserRoundPen,
    BadgeInfo,
    ReceiptText,
    GlobeLock
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { setAccessToken, setAdmin } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";


const navItems = [
    { name: "Dashboard", icon: LayoutGrid, href: "/" },
    { name: "Company Management", icon: ListOrdered, href: "/company-management" },
    { name: "User Managment", icon: ListOrdered, href: "/users" },
    { name: "Weekly Menu", icon: CircleDollarSign, href: "/weekly-menu" },
    { name: "Order Management", icon: CircleDollarSign, href: "/order-management" },
    { name: "Company Payment", icon: CircleDollarSign, href: "/company-payment" },
];


const settingsSubItems = [
    { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
    { name: "About Us", icon: BadgeInfo, href: "/settings/about" },
    { name: "Terms & Condition", icon: ReceiptText, href: "/settings/terms" },
    { name: "Privacy Policy", icon: GlobeLock, href: "/settings/privacy" },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const location = useLocation();
    const isSettingsPath = location.pathname.startsWith('/settings');
    const prevLocation = useRef(location);

    useEffect(() => {
        if (prevLocation.current !== location && isSidebarOpen) {
            setIsSidebarOpen(false);
        }
        prevLocation.current = location;
    }, [location, isSidebarOpen, setIsSidebarOpen]);

    const handleLogout = () => {
        dispatch(setAdmin(null));
        dispatch(setAccessToken(null));
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
    };

    return (
        <div className={`fixed top-0 left-0 z-40 h-screen bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
            <div className="p-4">
                <img src="/images/logo.png" alt="" className="dark:brightness-[400]" />
            </div>
            <ScrollArea className="h-[calc(100vh-149px)]">
                <nav className="flex-grow space-y-3 p-4">

                    {/* NavItems */}
                    {navItems.map((item) => (
                        <NavLink key={item.name} to={item.href} end className={({ isActive }) =>
                            `w-full flex items-center justify-start px-2 py-3 rounded-sm text-sm font-medium transition-colors duration-200 border 
                    ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-background dark:bg-white/5"
                            }`
                        } onClick={() => setIsSidebarOpen(false)}>
                            <item.icon className="mr-2 w-4 h-4" />
                            {item.name}
                        </NavLink>
                    ))}

                    <Collapsible defaultOpen={isSettingsPath}>
                        <CollapsibleTrigger onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`w-full flex items-center justify-between px-2 py-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 border 
                    ${isSettingsPath ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-background dark:bg-white/5"
                            }`}>
                            <div className="flex items-center text-sm px-2 py-1">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSettingsOpen ? "-rotate-180" : ""}`} />

                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2 space-y-2">
                            {settingsSubItems.map((item, index) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                                    className={({ isActive }) =>
                                        `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200 border 
                                ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground bg-background dark:bg-white/5"}`
                                    }
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon className="mr-2 w-4 h-4" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                </nav>
            </ScrollArea>
            <div className="border-t p-4">
                <Button onClick={handleLogout} variant="outline" className="justify-start w-full">
                    <LogOut />
                    Log out
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
