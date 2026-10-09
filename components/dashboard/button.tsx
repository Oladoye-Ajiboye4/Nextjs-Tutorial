"use client";


export default function Button( {clickMe}: {clickMe: () => void}) {
    return (
        <button onClick={clickMe}>Click me</button>
    );
}