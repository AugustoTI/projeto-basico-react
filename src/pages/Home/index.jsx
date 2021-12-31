// CSS:
import './styles.css';
// React:
import { Component } from 'react';
// Componentes e Utilitarios:
import { fetchPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 3,
        searchValue: '',
    };

    async componentDidMount() {
        await this.loadPosts();
    }

    loadPosts = async () => {
        const postsAndPhotos = await fetchPosts();
        const { page, postsPerPage } = this.state;
        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos,
        });
    };

    loadMorePosts = () => {
        const { page, posts, allPosts, postsPerPage } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

        posts.push(...nextPosts);
        this.setState({ posts, page: nextPage });
    };

    handleChange = ({ target }) => this.setState({ searchValue: target.value });

    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
        const noMorePosts = page + postsPerPage >= allPosts.length;

        const filtredPosts = searchValue
            ? allPosts.filter((post) => {
                  return post.title.toLowerCase().includes(searchValue.toLowerCase());
              })
            : posts;

        return (
            <section className="container">
                <div className="search-container">
                    {searchValue && <h1>Search Value: {searchValue}</h1>}
                    <Input valueInput={searchValue} action={this.handleChange} />
                </div>

                {filtredPosts.length > 0 && <Posts myPosts={filtredPosts} />}

                {filtredPosts.length === 0 && <p>There are no more posts :( </p>}

                <div className="button-container">
                    {!searchValue && (
                        <Button
                            disabled={noMorePosts}
                            loadMorePosts={this.loadMorePosts}
                            text="Load More Posts"
                        />
                    )}
                </div>
            </section>
        );
    }
}

export default Home;
