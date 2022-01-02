import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './index';

describe('<Input />', () => {
    it('should have a value of valueInput', () => {
        const fn = jest.fn();
        render(<Input valueInput={'testando'} action={fn} />);

        const input = screen.getByPlaceholderText(/Type your Search/i);
        expect(input.value).toBe('testando');
    });

    it('should call handleChange function on each key press', () => {
        const fn = jest.fn();
        render(<Input action={fn} />);

        const input = screen.getByPlaceholderText(/Type your Search/i);
        const value = 'o valor digitado';

        userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('should macth snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<Input action={fn} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
