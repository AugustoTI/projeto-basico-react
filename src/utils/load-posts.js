export const fetchPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photo] = await Promise.all([postsResponse, photoResponse]);
    const postsJSON = await posts.json();
    const photoJSON = await photo.json();

    const postsAndPhotos = postsJSON.map((post, index) => {
        return {
            ...post,
            cover: photoJSON[index].url,
        };
    });

    return postsAndPhotos;
};

// 
