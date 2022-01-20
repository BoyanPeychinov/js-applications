import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

export async function getGameById(gameId) {
    return api.get('/data/games/' + gameId);
}

export async function getRecentGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function createGame(game) {
    return api.post('/data/games', game);
}

export async function gameDetails(gameId) {
    return api.get('/data/games/' + gameId);
}

export async function editGame(gameId, game) {
    return api.put('/data/games/' + gameId, game);
}

export async function deleteGame(gameId) {
    return api.del('/data/games/' + gameId);
}

export async function getCommentsByGameId(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function addComment(comment) {
    return api.post('/data/comments', comment);
}