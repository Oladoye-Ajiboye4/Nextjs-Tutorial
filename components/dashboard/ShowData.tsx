"use client";

export default function ShowData({ data }: { data: any }) {
    // console.log('ShowData component rendered with data:', data);
    return (
        <div>
            <h2>Data from API:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );  
}