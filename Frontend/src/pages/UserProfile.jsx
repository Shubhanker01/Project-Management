import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { User, Mail } from "lucide-react";
import LogoutModal from "@/components/form/LogoutModal";
import { useAuth } from "../provider/AuthProvider";

export default function UserProfile() {
  const { user } = useAuth()

  return (
    <div className="md:max-w-xl max-w-full md:mx-auto md:px-6 px-2 py-8">

      <Card className="bg-slate-900 border-slate-800 shadow-lg">

        <CardHeader className="flex flex-col items-center space-y-4">

          <Avatar className="h-28 w-28 border-4 border-indigo-500">
            <AvatarImage src={user.avatar.url} />
            <AvatarFallback className="text-3xl text-slate-100">
              {user.username || "name"}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <CardTitle className="text-2xl text-slate-100">
              {user.username}
            </CardTitle>

            <p className="text-slate-400">
              {user.email}
            </p>
          </div>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-indigo-400" />

              <div>
                <p className="text-sm text-slate-400">
                  Username
                </p>

                <p className="font-medium text-slate-200">
                  {user.username}
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">

            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-indigo-400" />

              <div>
                <p className="text-sm text-slate-400">
                  Email
                </p>

                <p className="font-medium text-slate-200">
                  {user.email}
                </p>
              </div>

            </div>

          </div>
          <LogoutModal />
        </CardContent>

      </Card>

    </div>
  );
}