import * as parser from "./parser";

test("Item create leaf", () => {
    const item1 = parser.Item.createLeaf("item1", ["value1", "value2"]);
    expect(item1.isLeaf()).toBe(true);
    expect(item1.getValues()).toEqual(["value1", "value2"]);
    expect(item1.getName()).toBe("item1");
});

test("Parse simple", () => {

});