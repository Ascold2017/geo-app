
export function AuthLayout({ children }: { children: React.ReactNode }) {
    return <main className="container mx-auto py-3 flex flex-col items-center justify-center h-screen">
        { children }
    </main>
}