import { Bell, Moon, Sun, Menu, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/theme/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { useGetAdminProfileQuery } from "@/redux/feature/auth/authApi";
import { getInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Topbar = ({ onMenuClick }) => {
    const { setTheme, theme } = useTheme();
    const admin = useSelector((state) => state.auth.admin);
    const { isLoading } = useGetAdminProfileQuery();

    const handleLogout = () => {
        window.location.href = 'auth/login';
    };

    return (
        <header className="fixed top-0 right-0 left-0 flex items-center justify-between p-4 h-20 bg-sidebar text-sidebar-foreground lg:justify-end">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
                <Menu />
            </Button>
            <div className="flex items-center space-x-5 pr-2">
                {/* <Link to="notifications" className="relative cursor-pointer hidden lg:block">
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <Bell />
                </Link> */}
                {/* Theme Toggle */}
                <Toggle
                    variant="outline"
                    className="group rounded-full hidden lg:flex"
                    pressed={theme === "dark"}
                    onPressedChange={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    <Moon
                        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                        aria-hidden="true"
                    />
                    <Sun
                        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                        aria-hidden="true"
                    />
                </Toggle>

                {/* User Profile */}
                <div className="flex items-center">
                    {/* Desktop profile (link) */}
                    <Link to="/settings/profile" className="lg:flex items-center gap-3 hidden">
                        {isLoading ? (
                            // Skeleton for avatar + name while loading
                            <>
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-28 rounded-sm" />
                                </div>
                            </>
                        ) : (
                            <>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={admin?.profile_image} alt={admin?.name || "User avatar"} />
                                    <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium truncate max-w-[180px]" title={admin?.name || "User"}>
                                    {admin?.name || "User"}
                                </span>
                            </>
                        )}
                    </Link>

                    {/* User Dropdown (mobile) */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {isLoading ? (
                                <Skeleton className="h-10 w-10 rounded-full lg:hidden" />
                            ) : (
                                <Avatar className="h-10 w-10 lg:hidden">
                                    <AvatarImage src={admin?.profile_image} alt={admin?.name || "User avatar"} />
                                    <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
                                </Avatar>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-w-64 mr-4">
                            {isLoading ? (
                                <div className="p-2 min-w-[200px]">
                                    <Skeleton className="h-4 w-28 rounded mb-2" />
                                    <Skeleton className="h-3 w-40 rounded" />
                                </div>
                            ) : (
                                <DropdownMenuLabel className="flex min-w-0 flex-col">
                                    <span className="text-foreground truncate text-sm font-medium">
                                        {admin?.name || "User"}
                                    </span>
                                    <span className="text-muted-foreground truncate text-xs font-normal">
                                        {admin?.email || ""}
                                    </span>
                                </DropdownMenuLabel>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to="/notifications" className="w-full flex items-center">
                                        <Bell size={16} className="opacity-60 mr-2" aria-hidden="true" />
                                        <span>Notifications</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                    {theme === 'dark' ? <Sun size={16} className="opacity-60 mr-2" /> : <Moon size={16} className="opacity-60 mr-2" />}
                                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOutIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Topbar;