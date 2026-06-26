import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
    User,
    Paperclip,
    Circle,
    Clock3,
    CheckCircle2,
} from "lucide-react";

import UpdateTaskModal from "./form/UpdateTaskModal";
import DeleteTaskModal from "./form/DeleteTaskModal";
export default function TaskCard({
    task,
    setTasks
}) {
    const getStatusBadge = () => {
        switch (task.status) {
            case "todo":
                return (
                    <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-32 text-sm text-slate-100"
                    >
                        <Circle className="h-4 w-4" />
                        Todo
                    </Badge>
                );

            case "in_progress":
                return (
                    <Badge
                        className="bg-amber-600 flex items-center gap-1 w-32 text-sm"
                    >
                        <Clock3 className="h-4 w-4" />
                        In Progress
                    </Badge>
                );

            case "done":
                return (
                    <Badge
                        className="bg-emerald-600 flex items-center gap-1 w-32 text-sm"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                    </Badge>
                );

            default:
                return null;
        }
    };

    return (
        <Card className="bg-slate-800 border-slate-800 hover:border-slate-700 transition">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg text-slate-100">
                        {task.title}
                    </CardTitle>

                    {getStatusBadge()}
                </div>
            </CardHeader>

            <CardContent className="space-y-5">

                {/* Description */}
                <div>
                    <p className="text-sm text-slate-400">
                        {task.description}
                    </p>
                </div>

                {/* Assigned User */}
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <User className="h-4 w-4" />
                    <span>
                        Assigned to:
                        <span className="font-medium ml-1">
                            {task.assignedTo.username}
                        </span>
                    </span>
                </div>

                {/* Attachments */}
                {task.attachments?.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-200">
                            Attachments
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {task.attachments.map((file) => (
                                <a
                                    key={file._id}
                                    href={file.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    bg-slate-800
                    hover:bg-slate-700
                    text-slate-50
                    text-sm
                    transition
                  "
                                >
                                    <Paperclip className="h-4 w-4" />
                                    Attachment
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <UpdateTaskModal task={task} setTasks={setTasks} />
                    <DeleteTaskModal task={task} setTasks={setTasks} />
                </div>

            </CardContent>
        </Card>
    );
}