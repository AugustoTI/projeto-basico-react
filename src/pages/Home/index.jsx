// CSS:
import './styles.css';
// React:
import { useState, useEffect, useCallback } from 'react';
// Componentes e Utilitarios:
import { fetchPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(2);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filtredPosts = searchValue
        ? allPosts.filter((post) => {
              return post.title.toLowerCase().includes(searchValue.toLowerCase());
          })
        : posts;

    const loadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await fetchPosts();

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
    }, []);

    useEffect(() => {
        loadPosts(0, postsPerPage);
    }, [loadPosts, postsPerPage]);

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        setPosts(posts);
        setPage(nextPage);
    };

    const handleChange = ({ target }) => setSearchValue(target.value);

    return (
        <section className="container">
            <div className="search-container">
                {searchValue && <h1>Search Value: {searchValue}</h1>}
                <Input valueInput={searchValue} action={handleChange} />
            </div>

            {filtredPosts.length > 0 && <Posts myPosts={filtredPosts} />}

            {filtredPosts.length === 0 && <p>There are no more posts :( </p>}

            <div className="button-container">
                {!searchValue && (
                    <Button
                        disabled={noMorePosts}
                        onClick={loadMorePosts}
                        text="Load More Posts"
                    />
                )}
            </div>
        </section>
    );
};

export default Home;
