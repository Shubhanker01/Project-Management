import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getProject } from "@/services/projects";
import { useParams } from "react-router-dom";
import UpdateProjectModal from "@/components/form/UpdateProjectForm";
import DeleteProjectDialog from "@/components/form/DeleteProjectForm";

export default function Project() {
    const [project, setProject] = useState({
        name: "",
        description: "",
        totalMembers: 0,
        members: []
    })
    const { projectId } = useParams()
    useEffect(() => {
        async function getIndividualProject() {
            try {
                const json = await getProject(projectId)
                const res = await json.data
                console.log(res)
                setProject({ ...project, name: res?.data[0]?.name, description: res?.data[0]?.description, totalMembers: res?.data[0]?.totalMembers, members: res?.data[0].userDetails })
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
                            <CardTitle className="text-3xl">
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
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-800 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                Members
                            </p>
                            <p className="text-2xl font-bold">
                                {project.totalMembers}
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                Total Tasks
                            </p>
                            <p className="text-2xl font-bold">
                                24
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                Completed
                            </p>
                            <p className="text-2xl font-bold">
                                18
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
                    <div className="flex gap-4">
                        <UpdateProjectModal project={project} />
                        <DeleteProjectDialog projectName={project.name} />
                    </div>
                </CardContent>
                <Card className="bg-slate-800 border-slate-800 text-slate-100 w-[80%] m-4">
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>

                    <CardContent>
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
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Tasks</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {/* tasks */}
                    </CardContent>
                </Card>
            </Card>

        </div>
    );
}