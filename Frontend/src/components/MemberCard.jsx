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
        <div>
            <Card className="bg-slate-900 border-slate-800 w-1/2">
                <CardContent className="p-5">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            <Avatar className="h-12 w-12">
                                <AvatarImage src={member.avatar} />
                                {/* <AvatarFallback>
                                    {member.name[0]}
                                </AvatarFallback> */}
                            </Avatar>

                            <div>
                                <h3 className="font-semibold text-slate-100">
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