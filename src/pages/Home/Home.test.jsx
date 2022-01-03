import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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
    });
});
