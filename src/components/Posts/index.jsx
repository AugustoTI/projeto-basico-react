import { PostCard } from '../PostCard';
import './styles.css';

const Posts = ({ myPosts }) => (
    <div className="posts">
        {myPosts.map((post) => (
            <PostCard key={post.id} posts={post} />
        ))}
    </div>
);

export { Posts };
