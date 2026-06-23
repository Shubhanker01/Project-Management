import React, { useEffect, useState } from 'react'
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import MemberCard from "../components/MemberCard"
import { getProjectMembers } from '@/services/projects';
import { useParams } from 'react-router-dom';
import AddMemberModal from '@/components/form/AddMemberModal';

function TeamMemberDetails() {
    const { projectId } = useParams()
    const [members, setMembers] = useState([])
    useEffect(() => {
        async function getMembers() {
            try {
                const res = await getProjectMembers(projectId)
                const json = res.data
                const temp = []
                json.data.map((mem) => {
                    const member = {
                        _id: mem.user._id,
                        avatar: mem.user.avatar.url,
                        role: mem.role,
                        email: mem.user.email,
                        name: mem.user.username
                    }
                    temp.push(member)
                })
                setMembers(temp)
            } catch (error) {
                console.log(error)
            }
        }
        getMembers()
    }, [])

    return (
        <div>
            <div className="max-w-6xl mx-auto p-6 space-y-6">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Team Members
                    </h1>
                    <AddMemberModal setMembers={setMembers} />
                </div>

                <div className="space-y-4">
                    {members.map((member) => (
                        <MemberCard
                            key={member._id}
                            member={member}
                            setMembers={setMembers}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default TeamMemberDetails