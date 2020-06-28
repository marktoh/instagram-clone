export const getPosts = () => JSON.parse(localStorage.getItem('posts'));
export const setPosts = (posts) => localStorage.setItem('posts', JSON.stringify(posts));