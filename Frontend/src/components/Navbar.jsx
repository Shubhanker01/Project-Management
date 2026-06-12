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
} from "lucide-react";
import NavItem from "./NavItem"

export default function Navbar() {
    return (
        <aside className="h-screen w-64 bg-zinc-950 border-r border-zinc-800 text-zinc-200 flex flex-col">

            {/* Logo / Brand */}
            <div className="px-6 py-5 border-b border-zinc-800">
                <h1 className="text-xl font-semibold tracking-tight text-white">
                    ProjectFlow
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                    Manage everything in one place
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">

                <NavItem icon={<Home size={18} />} label="Home" />
                <NavItem icon={<User size={18} />} label="User Profile" />
                <NavItem icon={<FolderKanban size={18} />} label="Your Projects" />
                <NavItem icon={<CheckSquare size={18} />} label="Tasks" />
                <NavItem icon={<Settings size={18} />} label="Settings" />

            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-zinc-800 text-xs text-zinc-500">
                v1.0.0 • Dark Mode
            </div>
        </aside>
    );
}

