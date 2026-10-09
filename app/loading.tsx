export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
            <div className="flex items-center gap-3" role="status" aria-live="polite">
                <span className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                <span>Loading...</span>
            </div>
        </main>
    );
}
