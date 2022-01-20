import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getAlbumById(albumId) {
    return api.get('/data/albums/' + albumId);
}

export async function createAlbum(data) {
    return api.post('/data/albums', data);
}

export async function editAlbum(albumId, data) {
    return api.put('/data/albums/' + albumId, data);
}

export async function deleteAlbum(albumId) {
    return api.del('/data/albums/' + albumId);
}

export async function searchAlbums(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${encodeURIComponent(query)}%22`);
}