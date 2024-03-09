import { Outlet } from "react-router-dom";


export default function AuthLayout() {
    return <main className="container mx-auto py-3 flex flex-col items-center justify-center h-screen">
        <Outlet />
    </main>
}
