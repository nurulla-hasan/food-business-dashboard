import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
    LayoutGrid, Settings, LogOut, ChevronDown,
    UserRoundPen,
    BadgeInfo,
    ReceiptText,
    GlobeLock,
    UserRoundCog,
    Building2,
    UtensilsCrossed,
    ListOrdered,
    DollarSign
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { setAccessToken, setAdmin } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";
import { useTranslation } from 'react-i18next';


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { t } = useTranslation(['sidebar', 'common']);
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

    const navItems = useMemo(() => [
        { name: t("dashboard"), icon: LayoutGrid, href: "/" },
        { name: t("company-management"), icon: Building2, href: "/company-management" },
        { name: t("user-management"), icon: UserRoundCog, href: "/users" },
        { name: t("weekly-menu"), icon: UtensilsCrossed, href: "/weekly-menu" },
        { name: t("order-management"), icon: ListOrdered, href: "/order-management" },
        { name: t("company-payment"), icon: DollarSign, href: "/company-payment" },
    ], [t]);


    const settingsSubItems = useMemo(() => [
        { name: t("profile"), icon: UserRoundPen, href: "/settings/profile" },
        { name: t("about"), icon: BadgeInfo, href: "/settings/about" },
        { name: t("terms"), icon: ReceiptText, href: "/settings/terms" },
        { name: t("privacy"), icon: GlobeLock, href: "/settings/privacy" },
    ], [t]);

    return (
        <div className={`fixed top-0 left-0 z-40 h-screen bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
            <div className="p-4">
                <img src="/images/logo.png" alt="" className="dark:brightness-[400]" />
            </div>
            <ScrollArea className="h-[calc(100vh-149px)]">
                <nav className="flex-grow space-y-3 p-4">

                    {/* NavItems */}
                    {navItems.map((item) => (
                        <NavLink key={item.href} to={item.href} end className={({ isActive }) =>
                            `w-full flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200
                    ${isActive ? "border-x-2 border-primary bg-primary/20" : "hover:bg-accent hover:text-accent-foreground"
                            }`
                        } onClick={() => setIsSidebarOpen(false)}>
                            <item.icon className="mr-2 w-4 h-4" />
                            {item.name}
                        </NavLink>
                    ))}

                    <Collapsible defaultOpen={isSettingsPath}>
                        <CollapsibleTrigger onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`w-full flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${isSettingsPath ? "border-x-2 border-primary bg-primary/20" : "hover:bg-accent hover:text-accent-foreground"
                            }`}>
                            <div className="flex items-center text-sm px-2">
                                <Settings className="mr-2 h-4 w-4" />
                                {t('settings')}
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSettingsOpen ? "-rotate-180" : ""}`} />

                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2 space-y-2">
                            {settingsSubItems.map((item, index) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                                    className={({ isActive }) =>
                                        `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${isActive ? "border-x-2 border-primary bg-primary/20" : "hover:bg-accent hover:text-accent-foreground"}`
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
                    {t('common:logout')}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
