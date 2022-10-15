import * as pt from "./parser-types";

test("Range intersecting success", () => {
    const range1 = new pt.Range(0, 5);
    const range2 = new pt.Range(3, 10);
    expect(range1.isIntersecting(range2)).toBe(true);
    expect(range2.isIntersecting(range1)).toBe(true);
});

test("Range intersecting fail", () => {
    const range1 = new pt.Range(0, 5);
    const range2 = new pt.Range(6, 10);
    expect(range1.isIntersecting(range2)).toBe(false);
    expect(range2.isIntersecting(range1)).toBe(false);
});

test("Item create leaf", () => {
    const key = new pt.PositionedLiteral(new pt.Position(0, new pt.Range(0, 5)), "item1");
    const values = [new pt.PositionedLiteral(new pt.Position(0, new pt.Range(6, 10)), "value1")];
    const item1 = pt.Item.createLeaf(null, key, values);
    expect(item1.isLeaf()).toBe(true);
    expect(item1.getValues()).toEqual(values);
    expect(item1.getKey().getContent()).toBe("item1");
});
