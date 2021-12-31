import './styles.css';

const PostCard = ({ posts }) => (
    <div className="post">
        <img src={posts.cover} alt="imagem de teste" />
        <div className="post-content">
            <h1>{posts.title}</h1>
            <p>{posts.body}</p>
        </div>
    </div>
);

export { PostCard };
