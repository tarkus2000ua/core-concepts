import api from "./api/axios"

export const getMovieList = async (params,signal) => {
    return api.get('/movies', { params, signal })
};

export const getMovie = async (movieid) => {
    return api.get(`/movies/${movieid}`)
};

export const addMovie = async (movie) => {
    return api.post('/movies', movie)
};

export const updateMovie = async (movie) => {
    return api.put('/movies', movie)
};