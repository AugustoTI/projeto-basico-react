import './styles.css';

const Input = ({ valueInput, action }) => (
    <input
        placeholder="Type your Search"
        className="search-input"
        value={valueInput}
        onChange={action}
        type="search"
    />
);

export { Input };
