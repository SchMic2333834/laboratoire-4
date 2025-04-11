'use server'

export async function createPost(formData) {
    try {
        const post = {
            title: formData.get('title'),
            author: formData.get('author'),
            description: formData.get('description'),
            content: formData.get('content'),
            image: formData.get('image'),
            date: new Date().toISOString(),
            id: Math.random().toString(36).substr(2, 9)
        };

        const response = await fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        return { success: true, data: await response.json() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function createComment(formData) {
    try {
        const comment = {
            cardId: formData.get('cardId'),
            content: formData.get('content'),
            parentId: formData.get('parentId') || null,
            id: Math.random().toString(36).substr(2, 4)
        };

        const response = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment)
        });

        if (!response.ok) {
            throw new Error('Failed to create comment');
        }

        return { success: true, data: await response.json() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}