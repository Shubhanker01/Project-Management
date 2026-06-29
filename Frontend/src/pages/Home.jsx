import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Navbar */}
            <nav className="border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">ProjectFlow</h1>

                <div className="flex gap-4">
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
                        <Link to="/login">
                            Login
                        </Link>

                    </button>

                    <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">
                        <Link to="/signup">
                            Get Started
                        </Link>

                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-8 py-20">
                <h1 className="text-5xl font-bold leading-tight">
                    Manage Projects
                    <span className="text-blue-500"> Efficiently</span>
                </h1>

                <p className="mt-6 text-zinc-400 text-lg max-w-2xl">
                    Create projects, assign team members, track progress, and
                    collaborate seamlessly from one place.
                </p>

                <div className="mt-8 flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium">
                        Create Project
                    </button>

                    <button className="border border-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-900">
                        View Projects
                    </button>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-6xl mx-auto px-8 grid md:grid-cols-4 gap-6">
                <StatCard title="Projects" value="24" />
                <StatCard title="Team Members" value="58" />
                <StatCard title="Tasks" value="321" />
                <StatCard title="Completed" value="214" />
            </section>

            {/* Features */}
            <section className="max-w-6xl mx-auto px-8 py-20">
                <h2 className="text-3xl font-bold mb-10">
                    Everything you need
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Project Creation"
                        description="Admins can create and organize multiple projects."
                    />

                    <FeatureCard
                        title="Task Assignment"
                        description="Assign tasks to users and track ownership."
                    />

                    <FeatureCard
                        title="Progress Tracking"
                        description="Monitor project completion and deadlines."
                    />
                </div>
            </section>

            {/* Recent Activity */}
            <section className="max-w-6xl mx-auto px-8 pb-20">
                <h2 className="text-3xl font-bold mb-6">
                    Recent Activity
                </h2>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <ul className="space-y-4 text-zinc-300">
                        <li>✅ Project "E-Commerce Platform" created</li>
                        <li>👤 Rahul assigned to API Development</li>
                        <li>📌 Dashboard UI task marked completed</li>
                        <li>🚀 New sprint started for Mobile App</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-zinc-400">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
    );
}

function FeatureCard({ title, description }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-zinc-400 mt-3">{description}</p>
        </div>
    );
}