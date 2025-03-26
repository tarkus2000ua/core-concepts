import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter component", () => {
  test("renders initial value provided in props", () => {
    render(<Counter initialValue={156} />);
    expect(screen.getByText("156")).toBeInTheDocument();
  });

  test("clicking decrement button decreases the value", () => {
    render(<Counter initialValue={156} />);
    const decrementButton = screen.getByText("-");
    fireEvent.click(decrementButton);
    expect(screen.getByText("155")).toBeInTheDocument();
  });

  test("clicking increment button increases the value", () => {
    render(<Counter initialValue={156} />);
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);
    expect(screen.getByText("157")).toBeInTheDocument();
  });
});
