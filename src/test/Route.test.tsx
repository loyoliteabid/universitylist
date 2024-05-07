import { render, screen } from "@testing-library/react";
import UniversityList from "../views/UniversityList";

describe("Routing test", () => {
  test("University list", () => {
    render(<UniversityList />);
    expect(screen.getByText("University List (0)")).toBeDefined();
  });
});
