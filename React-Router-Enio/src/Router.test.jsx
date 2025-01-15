import { describe, it, expect } from "vitest";
import {render} from '@testing-library/react'
import { Router } from "./Router";

describe("Router", () => {
  it("deberia renderizar sin problema", () => {
    render(<Router routes={[]}/>) 
    expect(true).toBeTruthy()
  });
});
