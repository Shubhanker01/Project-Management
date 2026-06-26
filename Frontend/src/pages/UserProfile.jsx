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

import { Button } from "@/components/ui/button";

import { User, Mail, LogOut } from "lucide-react";
import LogoutModal from "@/components/form/LogoutModal";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect } from "react";

export default function UserProfile() {
  const { user } = useAuth()
  // useEffect(() => {
  //   const entries = performance.getEntriesByType('navigation')
  //   if (entries.length > 0) {
  //     const navigationType = entries[0].entryType
  //     if (navigationType === 'reload') {
  //       console.log("The page was reloaded")
  //     }
  //   }
  // }, [])
  return (
    <div className="max-w-xl mx-auto px-6 py-8">

      <Card className="bg-slate-900 border-slate-800 shadow-lg">

        <CardHeader className="flex flex-col items-center space-y-4">

          <Avatar className="h-28 w-28 border-4 border-indigo-500">
            <AvatarImage src={"https://placehold.co/600x400"} />
            <AvatarFallback className="text-3xl">
              my username
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <CardTitle className="text-2xl">
              Shub
            </CardTitle>

            <p className="text-slate-400">
              gmail.com
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

                <p className="font-medium">
                  my name
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

                <p className="font-medium">
                  My Email
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