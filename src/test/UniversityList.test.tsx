import { HttpResponse, http } from "msw";

import { render, screen } from "../utils/test.utils";
import UniversityList from "../views/UniversityList";
import { server } from "./mocks/server";

describe("UniversityList", () => {
  it("Checking the if title exits", () => {
    render(<UniversityList />);
    const text = screen.getByText("University List (0)");
    expect(text).toBeInTheDocument();
  });

  it("api success secnario on load", async () => {
    render(<UniversityList />);
    expect(await screen.findByText("Abu Dhabi University")).toBeInTheDocument();
  });

  it("api error scenario on load", () => {
    render(<UniversityList />);
    server.use(
      http.get(
        "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates",
        () => {
          return new HttpResponse(null, { status: 401 });
        }
      )
    );
    expect(screen.queryByText("Abu Dhabi University")).not.toBeInTheDocument();
  });
});
