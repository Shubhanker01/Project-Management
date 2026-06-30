import React from 'react'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Link } from 'react-router-dom'

function DisplayProjects({ userProjects, userId }) {

    return (

        <div>
            {userProjects.length === 0 ? (
                <div className="text-zinc-500 mt-10 text-center">
                    No projects yet. Create one 🚀
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userProjects.map((project) => (
                        <Item
                            key={project.projects._id}
                            className="bg-zinc-900 border  border-zinc-800 hover:border-indigo-500 transition rounded-xl p-4 cursor-pointer"
                        >
                            <div className='flex flex-col'>
                                <ItemTitle className="md:text-xl text-lg font-medium">{project.projects.name}</ItemTitle>

                                <ItemContent className="md:text-lg text-sm text-zinc-400 mt-2">
                                    {project.projects.description || "No Description"}
                                </ItemContent>
                                <ItemContent className="text-sm text-zinc-500 mt-2">
                                    <Link to={`/main-app/${userId}/user-projects/${project.projects._id}`}>
                                        Click to get more project details
                                    </Link>

                                </ItemContent>
                            </div>

                        </Item>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DisplayProjects