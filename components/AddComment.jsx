'use client';

import React from "react";
import { createComment } from "@/app/actions/actions";
import { addCommentToDb } from "@/utils/db";

export default function AddComment({ blogId, onCommentAdded }) {
    const [content, setContent] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            alert("Veuillez entrer un commentaire avant de soumettre.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.set('cardId', blogId);
            formData.set('content', content);
            formData.set('parentId', null);

            // First, create comment on the server
            const result = await createComment(formData);

            if (result.success) {
                // If server save successful, save to IndexedDB
                const comment = {
                    cardId: blogId,
                    content: content,
                    parentId: null,
                    id: result.data.id, // Use the ID from server response
                    date: new Date().toISOString()
                };

                await addCommentToDb(comment);
                
                setContent('');
                onCommentAdded();
            } else {
                alert("Erreur lors de l'ajout du commentaire. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Erreur lors de l'ajout du commentaire. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-end">
            <textarea 
                className="form-control mb-2"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrivez votre commentaire..."
                disabled={isSubmitting}
            />
            <button 
                type="submit"
                className="btn custom-btn"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Envoi...' : 'Envoyer'}
            </button>
        </form>
    );
}

