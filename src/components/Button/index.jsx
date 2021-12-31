import { Component } from 'react';
import './styles.css';

class Button extends Component {
    render() {
        const { text, loadMorePosts, disabled } = this.props;
        return (
            <button className="button" disabled={disabled} onClick={loadMorePosts}>
                {text}
            </button>
        );
    }
}

export { Button };
