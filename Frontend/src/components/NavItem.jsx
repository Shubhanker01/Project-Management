export default function NavItem({ icon, label }) {
    return (
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-900 transition">
            <span className="text-zinc-400">{icon}</span>
            <span className="text-sm">{label}</span>
        </div>
    );
}