interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function page1 ({params}: PageProps) {
    const { id } = await params;
    return (
        <div>
            <h1>Page {id}</h1>
            <p>Welcome to page {id}</p>
            <p>Page ID: {id}</p>
        </div>
    )
}
