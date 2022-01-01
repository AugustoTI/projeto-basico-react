import { Component } from 'react';
import './styles.css';

class Button extends Component {
    render() {
        const { text, onClick, disabled } = this.props;
        return (
            <button className="button" disabled={disabled} onClick={onClick}>
                {text}
            </button>
        );
    }
}

export { Button };
