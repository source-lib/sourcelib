import { Item, Position, Literal, Range } from "./parser-types";
import * as formatter from "./formatter";
import * as parser from "./parser";

test("Indent item", () => {

    const key = new Literal(new Position(0, new Range(5, 9)), "Test");
    const value1 = new Literal(new Position(0, new Range(70, 76)), "Value1");
    const value2 = new Literal(new Position(0, new Range(80, 86)), "Value2");
    const originalItem = Item.createLeaf(null, key, [ value1, value2 ]);

    const item = formatter.indentItem(originalItem, 0);
    
    expect(item.getKey().getPosition().getRange().getStart()).toBe(0);
    expect(item.getKey().getPosition().getRange().getEnd()).toBe(4);

    const v1 = item.getValues()![0];
    expect(v1.getPosition().getRange().getStart()).toBe(5);
    expect(v1.getPosition().getRange().getEnd()).toBe(11);

    const v2 = item.getValues()![1];
    expect(v2.getPosition().getRange().getStart()).toBe(12);
    expect(v2.getPosition().getRange().getEnd()).toBe(18);

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
    
    const originalRoot = kvTree.getRootItems()[0];
    const root = formatter.indentItem(originalRoot, 0);
    expect(root.getKey().getPosition().getRange().getStart()).toBe(0);
    expect(root.getKey().getPosition().getRange().getEnd()).toBe(4);

    const item1 = root.getChildren()![0];
    expect(item1.getKey().getPosition().getRange().getStart()).toBe(4);
});