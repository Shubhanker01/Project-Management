import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent } from './ui/card';
import { Badge } from "@/components/ui/badge";
import RemoveMemberDialog from "./form/RemoveMemberDialog"
import UpdateRoleModal from './form/UpdateRoleModal';

function MemberCard({ member, setMembers }) {
    return (
        <div className='m-4'>
            <Card className="bg-slate-900 border-slate-800 md:w-1/2 w-full">
                <CardContent className="p-5">

                    <div className="flex md:flex-row flex-col items-center md:justify-between">

                        <div className="flex md:flex-row flex-col items-center gap-4">

                            <Avatar className="h-12 w-12">
                                <AvatarImage src={member.avatar} />
                                {/* <AvatarFallback>
                                    {member.name[0]}
                                </AvatarFallback> */}
                            </Avatar>

                            <div className='justify-self-center'>
                                <h3 className="font-semibold text-slate-100 text-center">
                                    {member.name}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    {member.email}
                                </p>

                                <Badge className="mt-2">
                                    {member.role}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <UpdateRoleModal member={member} setMembers={setMembers} />
                            <RemoveMemberDialog setMembers={setMembers} member={member} />
                        </div>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default MemberCard