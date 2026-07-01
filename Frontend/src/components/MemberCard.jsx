import React from 'react'
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent } from './ui/card';
import { Badge } from "@/components/ui/badge";
import RemoveMemberDialog from "./form/RemoveMemberDialog"
import UpdateRoleModal from './form/UpdateRoleModal';

function MemberCard({ member, setMembers }) {
    return (
        <div className='m-4 w-full'>
            <Card className="bg-slate-900 border-slate-800 w-full">
                <CardContent className="p-2">

                    <div className="flex flex-col w-full">

                        <div className="flex flex-col justify-start gap-4 m-4">
                            <div>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={member.avatar} />
                                    {/* <AvatarFallback>
                                    {member.name[0]}
                                </AvatarFallback> */}
                                </Avatar>
                            </div>


                            <div>
                                <div>
                                    <h3 className="font-semibold text-slate-100">
                                        {member.name}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">
                                        {member.email}
                                    </p>
                                </div>
                                <div>
                                    <Badge className="mt-2">
                                        {member.role}
                                    </Badge>
                                </div>

                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col gap-2 m-4 w-full justify-start">
                            <div>
                                <UpdateRoleModal member={member} setMembers={setMembers} />
                            </div>
                            <div>
                                <RemoveMemberDialog setMembers={setMembers} member={member} />
                            </div>

                        </div>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default MemberCard