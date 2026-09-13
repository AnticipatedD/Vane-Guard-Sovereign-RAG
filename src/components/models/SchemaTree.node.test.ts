import { describe, it, expect } from "vitest";
import type { SchemaRowData } from "./types";
import {
    highlightMatch,
    matchesSearch,
    getExpandedForSearch,
} from "./SchemaTree";

function makeRow(
    partial: Partial<SchemaRowData> & Pick<SchemaRowData, "id" | "name">,
): SchemaRowData {
    return {
        type: "string",
        isArray: false,
        isObject: false,
        isOneOf: false,
        isOneOfChild: false,
        isFirstOneOfChild: false,
        isLastOneOfChild: false,
        required: false,
        depth: 0,
        isLast: true,
        ancestorIsLast: [],
        ...partial,
    };
}

describe("highlightMatch", () => {
    it("returns original text when search is empty", () => {
        expect(highlightMatch("hello", "")).toBe("hello");
    });

    it("returns original text when no match", () => {
        expect(highlightMatch("hello", "zzz")).toBe("hello");
    });

    it("wraps the matched substring in a mark element", () => {
        const result = highlightMatch("Hello World", "world");
        expect(result).not.toBe("Hello World");
        expect(result).toBeTruthy();
    });
});

describe("matchesSearch", () => {
    it("returns true when search is empty", () => {
        const row = makeRow({ id: "1", name: "prompt" });
        expect(matchesSearch(row, "")).toBe(true);
    });

    it("matches on name", () => {
        const row = makeRow({ id: "1", name: "temperature" });
        expect(matchesSearch(row, "temp")).toBe(true);
        expect(matchesSearch(row, "xyz")).toBe(false);
    });

    it("matches on description", () => {
        const row = makeRow({
            id: "1",
            name: "x",
            description: "Controls randomness",
        });
        expect(matchesSearch(row, "random")).toBe(true);
    });

    it("matches on type", () => {
        const row = makeRow({ id: "1", name: "x", type: "number" });
        expect(matchesSearch(row, "number")).toBe(true);
    });

    it("matches nested children", () => {
        const child = makeRow({ id: "c1", name: "nestedField", depth: 1 });
        const parent = makeRow({
            id: "p1",
            name: "parent",
            isObject: true,
            children: [child],
        });
        expect(matchesSearch(parent, "nested")).toBe(true);
        expect(matchesSearch(parent, "missing")).toBe(false);
    });
});

describe("getExpandedForSearch", () => {
    it("returns empty set when nothing matches", () => {
        const rows = [makeRow({ id: "1", name: "alpha" })];
        const expanded = getExpandedForSearch(rows, "zzz");
        expect(expanded.size).toBe(0);
    });

    it("expands ancestors when a child matches", () => {
        const child = makeRow({ id: "child", name: "leafMatch", depth: 1 });
        const parent = makeRow({
            id: "parent",
            name: "root",
            isObject: true,
            children: [child],
        });
        const expanded = getExpandedForSearch([parent], "leaf");
        expect(expanded.has("parent")).toBe(true);
    });

    it("expands a node that itself matches and has children", () => {
        const child = makeRow({ id: "c", name: "inner", depth: 1 });
        const parent = makeRow({
            id: "p",
            name: "targetName",
            isObject: true,
            children: [child],
        });
        const expanded = getExpandedForSearch([parent], "target");
        expect(expanded.has("p")).toBe(true);
    });
});
