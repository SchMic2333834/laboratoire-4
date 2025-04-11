import React from "react";

export default function BlogDetails({ id }) {
    const [blogPost, setBlogPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
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

        fetchBlogPost();
    }, [id]);

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
            <article>
                <h1 className="mb-4">{blogPost.title}</h1>
                <div className="mb-3">
                    <small>
                        Par {blogPost.author} • {new Date(blogPost.date).toLocaleDateString()}
                    </small>
                </div>
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
            </article>
    );
}