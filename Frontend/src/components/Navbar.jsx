/*   
Navbar
1. Home page
2. User profile
3. Your Projects
4. Tasks
5. Settings
*/

import {
    Home,
    User,
    FolderKanban,
    CheckSquare,
    Settings,
    Workflow
} from "lucide-react";

import { NavLink } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
    {
        title: "Home",
        icon: Home,
        path: "",
    },
    {
        title: "User Profile",
        icon: User,
        path: "user-profile",
    },
    {
        title: "Your Projects",
        icon: FolderKanban,
        path: "user-projects",
    },
    {
        title: "Tasks",
        icon: CheckSquare,
        path: "tasks",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "settings",
    },
];

export default function Navbar({ userId }) {
    const { state } = useSidebar();

    const isCollapsed = state === "collapsed";
    return (
        <Sidebar variant="sidebar" collapsible="icon" className="bg-slate-800 text-slate-200">
            <SidebarHeader className="border-b border-zinc-800">

                <Workflow className="h-7 w-7 text-indigo-500 shrink-0" />

                {!isCollapsed && (
                    <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                        }`}>
                        <h2 className="text-xl font-bold">
                            ProjectFlow
                        </h2>

                        <p className="text-xs text-muted-foreground">
                            Manage everything in one place
                        </p>
                    </div>
                )}

            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupLabel>
                        Navigation
                    </SidebarGroupLabel>

                    <SidebarGroupContent>

                        <SidebarMenu>

                            {menuItems.map((item) => {

                                const to =
                                    item.path === ""
                                        ? `/main-app/${userId}`
                                        : `/main-app/${userId}/${item.path}`;

                                return (
                                    <SidebarMenuItem key={item.title}>

                                        <SidebarMenuButton asChild>

                                            <NavLink
                                                to={to}
                                                end={item.path === ""}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "bg-indigo-600 text-white rounded-md"
                                                        : ""
                                                }
                                            >
                                                <item.icon size={18} />
                                                <span>{item.title}</span>
                                            </NavLink>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                );
                            })}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter className="border-t border-zinc-800">

                <div className="text-xs text-muted-foreground px-2 py-2">
                    v1.0.0 • Dark Mode
                </div>

            </SidebarFooter>

        </Sidebar>
    );
}

