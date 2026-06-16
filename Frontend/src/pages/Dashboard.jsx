import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Field, FieldLabel } from '@/components/ui/field'
import { Item, ItemTitle, ItemContent, ItemDescription } from '@/components/ui/item'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, AvatarGroupCount } from '@/components/ui/avatar'

function Dashboard() {
  const projects = [
    { "id": 1, name: "project 1", description: "Random description" },
    { "id": 2, name: "project 2", description: "Random description" },
    { "id": 3, name: "project 3", description: "Random description" },
  ]
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-slate-800 text-slate-100 m-2 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card className="m-2 bg-slate-800 text-slate-100 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">15</p>
          </CardContent>
        </Card>

        <Card className="m-2 bg-slate-800 text-slate-100 cursor-pointer">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">10</p>
          </CardContent>
        </Card>
      </div>

      <div className='mb-8'>
        <Card className="m-2 bg-slate-800 text-slate-100 w-full md:w-1/2">
          <CardHeader>
            <CardTitle>My Task Completion Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Field className="w-full max-w-sm">
              <FieldLabel htmlFor="progress-upload">
                <span>Progress</span>
                <span className="ml-auto">66%</span>
              </FieldLabel>
              <Progress value={66} id="progress-upload" />
            </Field>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="m-2 bg-gray-900 text-slate-100 w-full">
          <CardHeader>
            <CardTitle>Your Recent Projects</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
              projects.map((project) => {
                return (
                  <div id={project.id}>
                    <Item className="bg-gray-700 text-slate-100 mb-4 grid grid-cols-1">
                      <div>
                        <ItemContent>
                          <ItemTitle className="text-xl">{project.name}</ItemTitle>
                          <ItemDescription className="text-slate-200">{project.description}</ItemDescription>
                        </ItemContent>
                      </div>
                      <div>
                        <ItemTitle className="text-sm">Team Members</ItemTitle>
                        <AvatarGroup className="m-2">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                            <AvatarFallback>LR</AvatarFallback>
                          </Avatar>
                          <AvatarGroupCount>
                            <span className="text-sm">+2</span>
                          </AvatarGroupCount>
                        </AvatarGroup>
                      </div>
                    </Item>

                  </div>
                )
              })
            }
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Dashboard