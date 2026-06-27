import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
    CheckCircle2,
    Circle,
    Clock3,
    FolderKanban,
    Paperclip,
} from "lucide-react";

export default function AssignedTasks({ tasks }) {

    const statusBadge = (status) => {
        switch (status) {

            case "todo":
                return (
                    <Badge
                        variant="outline"
                        className="gap-1 text-slate-200"
                    >
                        <Circle className="h-3 w-3" />
                        Todo
                    </Badge>
                );

            case "in_progress":
                return (
                    <Badge className="bg-amber-600 gap-1">
                        <Clock3 className="h-3 w-3" />
                        In Progress
                    </Badge>
                );

            case "done":
                return (
                    <Badge className="bg-emerald-600 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Done
                    </Badge>
                );

            default:
                return null;
        }
    };

    if (!tasks.length) {
        return (
            <div className="flex flex-col justify-center items-center py-32">

                <FolderKanban className="h-16 w-16 text-slate-500 mb-4" />

                <h2 className="text-2xl font-semibold">
                    No tasks assigned to you!!!
                </h2>

                <p className="text-slate-400 mt-2">
                    You are lucky 😄
                </p>

            </div>
        );
    }

    return (

        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Tasks Assigned To You
                </h1>

                <p className="text-slate-400 mt-1">
                    Keep track of everything assigned to you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {tasks.map((task) => (

                    <Card
                        key={task._id}
                        className="bg-slate-900 border-slate-800 hover:border-indigo-500 transition"
                    >

                        <CardHeader>

                            <div className="flex justify-between items-start">

                                <CardTitle className="text-lg text-slate-100">
                                    {task.title}
                                </CardTitle>

                                {statusBadge(task.status)}

                            </div>

                        </CardHeader>

                        <CardContent className="space-y-4">

                            <p className="text-slate-400 text-sm line-clamp-3">
                                {task.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-slate-300">

                                <FolderKanban className="h-4 w-4 text-indigo-400" />

                                <span>{task.projectDetails.name}</span>

                            </div>

                            {task.attachments.length > 0 && (

                                <div className="flex items-center gap-2 text-sm">

                                    <Paperclip className="h-4 w-4" />

                                    <span className="text-slate-300">
                                        {task.attachments.length} Attachment
                                        {task.attachments.length > 1 && "s"}
                                    </span>

                                </div>

                            )}

                        </CardContent>

                    </Card>

                ))}

            </div>

        </div>
    );
}