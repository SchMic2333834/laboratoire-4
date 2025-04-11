"use client";

import React from "react";
import Blog from "./Blog";
import BlogList from "./BlogList";
import { useSearchParams } from "next/navigation";

export default function Index() {
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");

    return (
        <>
            <BlogList />
        </>
    );
}