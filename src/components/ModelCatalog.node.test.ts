import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FilterDropdown, SortSelect } from "./ModelCatalog";

describe("FilterDropdown", () => {
    const items = [
        { value: "text-generation", label: "Text Generation" },
        { value: "image", label: "Image" },
        { value: "audio", label: "Audio" },
    ];

    it("shows plain label when nothing is selected", () => {
        render(
            <FilterDropdown
                label="Task Types"
                items={items}
                selected={[]}
                onChange={() => {}}
            />,
        );
        expect(screen.getByText("Task Types")).toBeTruthy();
    });

    it("shows selection count when items are selected", () => {
        render(
            <FilterDropdown
                label="Task Types"
                items={items}
                selected={["text-generation", "image"]}
                onChange={() => {}}
            />,
        );
        expect(screen.getByText("Task Types (+2)")).toBeTruthy();
    });

    it("accepts an onChange callback prop", () => {
        const onChange = vi.fn();
        render(
            <FilterDropdown
                label="Authors"
                items={items}
                selected={[]}
                onChange={onChange}
            />,
        );
        expect(onChange).not.toHaveBeenCalled();
        expect(screen.getByText("Authors")).toBeTruthy();
    });
});

describe("SortSelect", () => {
    it("renders newest-first label by default", () => {
        render(<SortSelect sortOrder="newest" onChange={() => {}} />);
        expect(screen.getByText("Newest first")).toBeTruthy();
    });

    it("renders oldest-first label when sortOrder is oldest", () => {
        render(<SortSelect sortOrder="oldest" onChange={() => {}} />);
        expect(screen.getByText("Oldest first")).toBeTruthy();
    });

    it("accepts an onChange callback prop", () => {
        const onChange = vi.fn();
        render(<SortSelect sortOrder="newest" onChange={onChange} />);
        expect(onChange).not.toHaveBeenCalled();
        expect(screen.getByText("Newest first")).toBeTruthy();
    });
});
If @testing-library/react is missing, add it as a devDependency:
```bash
  pnpm add -D @testing-library/react
