"use client";

import Blog from "@/components/Blog.jsx";
import React from "react";

export default function BlogPage({ params }) {
    const resolvedParams = React.use(params);
    return <Blog id={resolvedParams.id} />;
}