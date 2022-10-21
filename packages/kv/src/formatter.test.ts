import { Item, Position, Literal, Range } from "./parser-types";
import * as formatter from "./formatter";
import * as parser from "./parser";

test("Indent item", () => {

    const key = new Literal(new Position(0, new Range(0, 4)), "Test");
    const value1 = new Literal(new Position(0, new Range(5, 11)), "Value1");
    const value2 = new Literal(new Position(0, new Range(12, 18)), "Value2");
    const item = Item.createLeaf(null, key, [ value1, value2 ]);

    expect(item.getKey().getPosition().getRange().getStart()).toBe(0);
    expect(item.getKey().getPosition().getRange().getEnd()).toBe(4);

    formatter.indentItem(item, 4);
    
    expect(item.getKey().getPosition().getRange().getStart()).toBe(4);
    expect(item.getKey().getPosition().getRange().getEnd()).toBe(8);

    const v1 = item.getValues()![0];
    expect(v1.getPosition().getRange().getStart()).toBe(9);
    expect(v1.getPosition().getRange().getEnd()).toBe(15);

    const v2 = item.getValues()![1];
    expect(v2.getPosition().getRange().getStart()).toBe(16);
    expect(v2.getPosition().getRange().getEnd()).toBe(22);

});

test("Indent container", () => {
    const kvFile = 
`   Test {
 item1       val1
item2 val2

Test2 {
          item3 val3
}
}`;

    const kvTree = parser.parseText(kvFile);
    formatter.formatIndentation(kvTree);

    const root = kvTree.getRootItems()[0];
    expect(root.getKey().getPosition().getRange().getStart()).toBe(3);
    expect(root.getKey().getPosition().getRange().getEnd()).toBe(7);
});