"use client";

import React from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import BlogDetails from "./BlogDetails";

export default function Blog({ id }) {
    const [blogPost, setBlogPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [commentsKey, setCommentsKey] = React.useState(0);

    React.useEffect(() => {
        if (id) {
            fetchBlogPost();
        }
    }, [id]);

    const handleCommentAdded = () => {
        setCommentsKey(prev => prev + 1);
    };

    const fetchBlogPost = async () => {
        try {
            const response = await fetch('http://localhost:3000/cards');
            const cardsData = await response.json();
            const post = cardsData.find(card => card.id == id);
            
            if (post) {
                setBlogPost(post);
            } else {
                setError('Article non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'article:', error);
            setError('Erreur lors du chargement de l\'article');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <BlogDetails id={id} />
            <div className="comments-section mt-5">
                <h2>Commentaires</h2>
                <AddComment blogId={id} onCommentAdded={handleCommentAdded} />
                <CommentList key={commentsKey} blogId={id} />
            </div>
        </div>
    );
}