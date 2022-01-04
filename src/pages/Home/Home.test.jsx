import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from './';

const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    userId: 1,
                    id: 1,
                    title: 'title 1',
                    body: 'body 1',
                },
                {
                    userId: 2,
                    id: 2,
                    title: 'title 2',
                    body: 'body 2',
                },
                {
                    userId: 3,
                    id: 3,
                    title: 'title 3',
                    body: 'body 3',
                },
            ])
        );
    }),
    rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    url: 'img1.png',
                },
                {
                    url: 'img2.png',
                },
                {
                    url: 'img3.png',
                },
            ])
        );
    }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
    beforeAll(() => {
        server.listen();
    });

    beforeEach(() => server.resetHandlers());

    afterAll(() => {
        server.close();
    });

    it('should render search, posts and load more', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('There are no more posts :(');

        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getByPlaceholderText(/Type your Search/i);
        expect(search).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);

        const button = screen.getByRole('button', { name: /Load More Posts/i });
        expect(button).toBeInTheDocument();
    });

    it('should search for posts', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('There are no more posts :(');

        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getByPlaceholderText(/Type your Search/i);

        expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: 'title 3' })
        ).not.toBeInTheDocument();

        userEvent.type(search, 'title 1');
        expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: 'title 2' })
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: 'title 3' })
        ).not.toBeInTheDocument();

        userEvent.clear(search);
        expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    });

    it('should load more posts', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('There are no more posts :(');

        await waitForElementToBeRemoved(noMorePosts);

        const button = screen.getByRole('button', { name: /load more posts/i });

        userEvent.click(button);
        expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
});
