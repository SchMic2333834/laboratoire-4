"use client";

import Localbase from 'localbase';

const db = new Localbase('db');

export async function addPost(post) {
    try {
        await db.collection('posts').add(post);
        return { success: true, data: post };
    } catch (error) {
        console.error('Failed to add post:', error);
        throw error;
    }
}

export async function getPosts() {
    try {
        const posts = await db.collection('posts').get();
        return posts;
    } catch (error) {
        console.error('Failed to get posts:', error);
        throw error;
    }
}

export async function deletePost(id) {
    try {
        await db.collection('posts').doc({ id: id }).delete();
        return { success: true };
    } catch (error) {
        console.error('Failed to delete post:', error);
        throw error;
    }
}

export async function updatePost(id, updatedData) {
    try {
        await db.collection('posts').doc({ id: id }).update(updatedData);
        return { success: true, data: updatedData };
    } catch (error) {
        console.error('Failed to update post:', error);
        throw error;
    }
}

export async function addCommentToDb(comment) {
    try {
        await db.collection('comments').add(comment);
        return { success: true, data: comment };
    } catch (error) {
        console.error('Failed to add comment:', error);
        throw error;
    }
}

export async function getComments() {
    try {
        const comments = await db.collection('comments').get();
        return comments;
    } catch (error) {
        console.error('Failed to get comments:', error);
        throw error;
    }
}

export async function deleteComment(id) {
    try {
        await db.collection('comments').doc({ id: id }).delete();
        return { success: true };
    } catch (error) {
        console.error('Failed to delete comment:', error);
        throw error;
    }
}

export async function updateComment(id, updatedData) {
    try {
        await db.collection('comments').doc({ id: id }).update(updatedData);
        return { success: true, data: updatedData };
    } catch (error) {
        console.error('Failed to update comment:', error);
        throw error;
    }
}

