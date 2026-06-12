import React from 'react'
import { useState } from 'react';

function DisplayProjects() {
    const [projects, setProjects] = useState([
        { id: 1, name: "Sample Project" },
    ]);
    return (
        <div>
            {projects.length === 0 ? (
                <div className="text-zinc-500 mt-10 text-center">
                    No projects yet. Create one 🚀
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition rounded-xl p-4"
                        >
                            <h2 className="text-lg font-medium">{project.name}</h2>

                            <p className="text-sm text-zinc-500 mt-2">
                                Click to open project details
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DisplayProjects