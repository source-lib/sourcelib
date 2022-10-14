import { Position, Range, PositionedLiteral } from "./parser-types";
import * as parser from "./parser";

test("Item create leaf", () => {
    const item1 = parser.Item.createLeaf(new PositionedLiteral(new Position(0, new Range(0, 5)), "item1"), ["value1", "value2"]);
    expect(item1.isLeaf()).toBe(true);
    expect(item1.getValues()).toEqual(["value1", "value2"]);
    expect(item1.getKey().getContent()).toBe("item1");
});
