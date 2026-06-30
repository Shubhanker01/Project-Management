import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Field, FieldLabel } from '@/components/ui/field'
import { Item, ItemTitle, ItemContent, ItemDescription } from '@/components/ui/item'
import { getSummary } from '../services/dashboard'

function Dashboard() {
  const [summary, setSummary] = useState({
    _id: "",
    totalProjects: 0,
    userProjects: [],
    totalTasks: 0,
    completedTasks: 0
  })
  function percCalculate() {
    const calc = Math.round((summary.completedTasks / summary.totalTasks) * 100)
    if (Number.isNaN(calc)) return 0
    return calc
  }
  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await getSummary()
        const json = await res.data
        setSummary({ ...summary, _id: json.data[0]._id, totalProjects: json.data[0].totalProjects, userProjects: json.data[0].userProjects, totalTasks: json.data[0].totalTasks, completedTasks: json.data[0].completedTasks })
      } catch (error) {
        console.log(error)
      }
    }
    fetchSummary()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-slate-800 text-slate-100 m-2 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="md:text-2xl text-lg font-bold">{summary.totalProjects}</p>
          </CardContent>
        </Card>

        <Card className="m-2 bg-slate-800 text-slate-100 cursor-pointer">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="md:text-xl text-lg font-bold">{summary.totalTasks}</p>
          </CardContent>
        </Card>

        <Card className="m-2 bg-slate-800 text-slate-100 cursor-pointer">
          <CardHeader>
            <CardTitle>Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="md:text-xl text-lg font-bold">{summary.completedTasks}</p>
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
                <span className="ml-auto">{percCalculate()}%</span>
              </FieldLabel>
              <Progress value={percCalculate()} id="progress-upload" />
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
              summary.userProjects.map((project) => {
                return (
                  <div id={project.id}>
                    <Item className="bg-gray-700 text-slate-100 mb-4 grid grid-cols-1">
                      <div>
                        <ItemContent>
                          <ItemTitle className="md:text-xl text-lg">{project.name}</ItemTitle>
                          <ItemDescription className="text-slate-200">{project.description}</ItemDescription>
                        </ItemContent>
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