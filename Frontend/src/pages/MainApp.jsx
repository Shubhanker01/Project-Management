import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import ProjectCreationForm from "../components/form/ProjectCreationForm";
import { useParams, Outlet } from "react-router-dom";
import {
    SidebarProvider, SidebarTrigger,
} from "../components/ui/sidebar";

export default function MainApp() {
    const { userId } = useParams()

    return (
        <SidebarProvider>
            <Navbar userId={userId} />
            <div className="min-h-screen flex bg-zinc-950 text-zinc-100 px-6 py-5 w-full">

                <SidebarTrigger className="m-4" />
                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>

    );
}