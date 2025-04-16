import api from "./api/axios"

export const getMovieList = async (params,signal) => {
    return api.get('/movies', { params, signal })
};