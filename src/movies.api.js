import api from "./api/axios"

export const getMovieList = async (offset, limit) => {
    return api.get('/movies', { params: { offset, limit } })
};