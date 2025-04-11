export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        let url = 'http://localhost:3000/cards';
        if (id) {
            url = `http://localhost:3000/cards/${id}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: id ? 'Card not found' : 'Failed to fetch cards' }), 
                {
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch cards' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        
        const newCard = {
            id: data.id || Math.random().toString(36).substr(2, 9),
            title: data.title,
            author: data.author,
            description: data.description || '',
            content: data.content,
            image: data.image,
            date: data.date || new Date().toISOString()
        };

        const response = await fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCard)
        });

        if (!response.ok) {
            throw new Error('Failed to create card');
        }

        const createdCard = await response.json();
        return new Response(JSON.stringify(createdCard), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create card' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await request.json();
        const updatedCard = {
            id,
            title: data.title,
            author: data.author,
            description: data.description,
            content: data.content,
            image: data.image,
            date: data.date || new Date().toISOString()
        };

        const response = await fetch(`http://localhost:3000/cards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCard)
        });

        if (!response.ok) {
            throw new Error('Failed to update card');
        }

        const updatedCardResponse = await response.json();
        return new Response(JSON.stringify(updatedCardResponse), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update card' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await fetch(`http://localhost:3000/cards/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete card');
        }

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete card' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


