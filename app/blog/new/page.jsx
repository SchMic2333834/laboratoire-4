"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/actions/actions';
import { addPost } from '@/utils/db';

export default function NewBlogPage() {
    const router = useRouter();
    const formRef = useRef(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData) {
        setIsSubmitting(true);
        setError('');

        try {
            const result = await createPost(formData);

            if (result.success) {
                const post = {
                    title: formData.get('title'),
                    author: formData.get('author'),
                    description: formData.get('description'),
                    content: formData.get('content'),
                    image: formData.get('image'),
                    date: new Date().toISOString(),
                    id: result.data.id
                };


                await addPost(post);


                formRef.current?.reset();
                router.push('/');
                router.refresh();
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const insertFigure = () => {
        const figureImage = document.getElementById('figureImage').value;
        const figureCaption = document.getElementById('figureCaption').value;

        if (!figureImage) return;

        const contentTextarea = document.getElementById('postContent');
        const figure = `
            <figure class='figure d-flex justify-content-evenly align-items-center flex-column w-100 my-4'>
                <img src='${figureImage}' class='figure-img img-fluid rounded' alt='Figure image'>
                ${figureCaption ? `<figcaption class='figure-caption'>${figureCaption}</figcaption>` : ''}
            </figure>
        `;

        contentTextarea.value = contentTextarea.value + figure;

        document.getElementById('figureImage').value = '';
        document.getElementById('figureCaption').value = '';
    };

    return (
        <div className="container mt-5">
            <h1>Add a New Blog Post</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form ref={formRef} action={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="postTitle" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="postTitle" 
                        name="title" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postAuthor" className="form-label">Author</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="postAuthor" 
                        name="author" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postDescription" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="postDescription" 
                        name="description" 
                        rows="2" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postContent" className="form-label">Content</label>
                    <textarea 
                        className="form-control" 
                        id="postContent" 
                        name="content" 
                        rows="5" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postImage" className="form-label">Image URL</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="postImage" 
                        name="image" 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="figureImage" className="form-label">Figure Image URL (Optional)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="figureImage" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="figureCaption" className="form-label">Figure Caption (Optional)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="figureCaption" 
                    />
                </div>
                <button 
                    type="button" 
                    className="btn btn-secondary mb-3" 
                    onClick={insertFigure}
                >
                    Insert Figure
                </button>

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}


