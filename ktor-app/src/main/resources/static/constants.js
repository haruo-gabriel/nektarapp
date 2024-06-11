export const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzEyNjMzYmFjZjEwNTA0ODc3ZmFjNWVkNDZkMWMxNiIsInN1YiI6IjY2MDQ5OGZmZDdjZDA2MDE2NDg3YmJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mOdCpu98YOj5VA2f3PLUXCwXXtVYs0w2zzLjJk3oZBQ';
export const GetOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};

export const apiUrl = 'https://api.themoviedb.org/3';
export const imagesBaseUrl = 'https://image.tmdb.org/t/p';

export function getWindowWidth() {
    return window.innerWidth;
}
