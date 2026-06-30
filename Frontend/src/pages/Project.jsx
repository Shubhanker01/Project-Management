import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getProject } from "@/services/projects";
import { Link, useParams } from "react-router-dom";
import UpdateProjectModal from "@/components/form/UpdateProjectForm";
import DeleteProjectDialog from "@/components/form/DeleteProjectForm";
import { ItemContent } from "@/components/ui/item";
import { ArrowRight } from "lucide-react";
import AssignTaskDialog from "@/components/form/AssignTaskDialog";

export default function Project() {
    const [project, setProject] = useState({
        name: "",
        description: "",
        totalMembers: 0,
        members: [],
        totalTasks: 0,
        completedTasks: 0
    })
    const { projectId, userId } = useParams()
    useEffect(() => {
        async function getIndividualProject() {
            try {
                const json = await getProject(projectId)
                const res = await json.data
                console.log(res)
                setProject({ ...project, name: res?.data[0]?.name, description: res?.data[0]?.description, totalMembers: res?.data[0]?.totalMembers, members: res?.data[0].userDetails, totalTasks: res?.data[0].totalTasks, completedTasks: res?.data[0].completedTasks })
            } catch (error) {
                console.log(error)
            }
        }
        getIndividualProject()
    }, [project.name, project.description])
    return (
        <div className="max-w-6xl mx-auto p-6">
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="md:text-3xl text-lg">
                                {project.name}
                            </CardTitle>

                        </div>

                        <Badge className="bg-emerald-600">
                            Active
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Stats */}
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="bg-slate-800 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                Members
                            </p>
                            <p className="md:text-2xl text-sm font-bold">
                                {project.totalMembers}
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                Total Tasks
                            </p>
                            <p className="md:text-2xl text-sm font-bold">
                                {project.totalTasks}
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                Completed
                            </p>
                            <p className="md:text-2xl text-sm font-bold">
                                {project.completedTasks}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="font-semibold text-lg mb-2">
                            Description
                        </h2>

                        <p className="text-slate-300 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <UpdateProjectModal project={project} />
                        <DeleteProjectDialog projectName={project.name} />
                    </div>
                </CardContent>
                <Card className="bg-slate-800 border-slate-800 text-slate-100 md:w-[80%] w-[90%] m-4">
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <ItemContent className="grid grid-cols-4 md:grid-cols-14 gap-0.5">
                            {
                                project.members.map((user) => {
                                    return <div key={user._id}>
                                        <Avatar className="cursor-pointer">
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <AvatarImage src={`${user.avatar.url}`}></AvatarImage>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{user.username}</p>
                                                </TooltipContent>
                                            </Tooltip>

                                        </Avatar>
                                    </div>
                                })
                            }
                        </ItemContent>

                        <ItemContent className="text-sm text-zinc-200 mt-2">
                            <Link to={`/main-app/${userId}/user-projects/${projectId}/members`}>
                                Click Here to get more member details
                            </Link>

                        </ItemContent>
                    </CardContent>
                </Card>
                <div className="flex flex-col md:flex-row">
                    <div>
                        <AssignTaskDialog members={project.members} />
                    </div>
                    <div>
                        <Button
                            asChild
                            className="bg-indigo-600
    hover:bg-indigo-500 transition-all duration-200 md:w-32 w-[90%] m-4"
                        >
                            <Link
                                to={`/main-app/${userId}/user-projects/${projectId}/tasks`}
                            >
                                View Tasks
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                </div>

            </Card>

        </div>
    );
}