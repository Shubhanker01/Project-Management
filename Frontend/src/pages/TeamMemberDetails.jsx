import React, { useEffect, useState } from 'react'
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
            <div className="max-w-full md:p-6 p-2 md:space-y-6 space-y-1.5">

                <div className="flex items-center justify-between">
                    <h1 className="md:text-3xl text-lg md:font-bold">
                        Team Members
                    </h1>
                    <AddMemberModal setMembers={setMembers} />
                </div>

                <div className="m-2 grid lg:grid-cols-3 grid-cols-1 gap-4">
                    {members.map((member) => (
                        <div key={member._id}>
                            <MemberCard
                                member={member}
                                setMembers={setMembers}
                            />
                        </div>

                    ))}
                </div>

            </div>
        </div>
    )
}

export default TeamMemberDetails