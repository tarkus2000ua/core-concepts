import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./search-form";

describe("SearchForm component", () => {
  test("renders an input with the initial value passed in props", () => {
    render(<SearchForm initialValue="Barbie" onSearch={jest.fn()} />);
    
    const input = screen.getByPlaceholderText("What do you want to watch?");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Barbie");
  });

  test("calls onSearch with correct value when submit button is clicked", () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initialValue="" onSearch={onSearchMock} />);
    
    const input = screen.getByPlaceholderText("What do you want to watch?");
    const button = screen.getByText("Search");
    
    fireEvent.change(input, { target: { value: "Oppenheimer" } });
    fireEvent.click(button);
    
    expect(onSearchMock).toHaveBeenCalledWith("Oppenheimer");
  });

  test("calls onSearch with correct value when Enter key is pressed", async () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initialValue="" onSearch={onSearchMock} />);
    
    const input = screen.getByPlaceholderText("What do you want to watch?");
    
    // fireEvent.change(input, { target: { value: "Dune" } });
    await userEvent.type(input, "Dune{enter}");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    
    expect(onSearchMock).toHaveBeenCalledWith("Dune");
  });
});
