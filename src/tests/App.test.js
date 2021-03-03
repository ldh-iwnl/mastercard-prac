import { render, screen, waitFor, within } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { mockRepo, mockUser } from './fixture'

const server = setupServer(
  rest.get("https://api.github.com/search/users", (req, resp, ctx) => {
    return resp(ctx.json(mockUser));
  }),
  rest.get("https://api.github.com/users/:userName/repos", (req, resp, ctx) => {
    return resp(ctx.json(mockRepo));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render properly', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

test('render title', () => {
  const { getByRole } = render(<App />);
  const title = getByRole("heading", { name: "Github user repos list" });
  expect(title).toBeInTheDocument();
});

describe('can search user', () => {
  beforeEach(async () => {
    const { getByTestId, queryByTestId } = render(
      <App />
    );
    const input = getByTestId('input');
    const button = getByTestId('button');
    userEvent.type(input, "mojombo");
    userEvent.click(button);
    await waitFor(() => expect(getByTestId("loader")).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId("loader")).toBeNull());
  })

  test('render username', () => {
    const userName = screen.getByRole("heading", { name: "mojombo" });
    expect(userName).toBeInTheDocument();
  })

  it("should render a list of repos", () => {
    const list = document.querySelector(".repo-list");
    expect(list).toBeInTheDocument();
    const repos = within(list).getAllByRole("heading");
    expect(repos).toHaveLength(mockRepo.length);
    expect(repos.map((t) => t.textContent)).toEqual(
      mockRepo.map((r) => r.full_name)
    );
  });
})