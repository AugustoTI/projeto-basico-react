import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with the text "Load More"', () => {
        render(<Button text="Load More" />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load More" onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });
        fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        render(<Button text="Load More" disabled={true} />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="Load More" disabled={true} />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeEnabled();
    });
});
