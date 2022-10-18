import { Item, Position, PositionedLiteral, Range } from "./parser-types";
import * as formatter from "./formatter";

test("Indent item", () => {

    const key = new PositionedLiteral(new Position(0, new Range(0, 4)), "Test");
    const value1 = new PositionedLiteral(new Position(0, new Range(5, 11)), "Value1");
    const value2 = new PositionedLiteral(new Position(0, new Range(12, 18)), "Value2");
    const item = Item.createLeaf(null, key, [ value1, value2 ]);

    expect(item.getKey().getPosition().range.start).toBe(0);
    expect(item.getKey().getPosition().range.end).toBe(4);

    formatter.indentItem(item, 4);
    
    expect(item.getKey().getPosition().range.start).toBe(4);
    expect(item.getKey().getPosition().range.end).toBe(8);

    const v1 = item.getValues()![0];
    expect(v1.getPosition().range.start).toBe(9);
    expect(v1.getPosition().range.end).toBe(15);

    const v2 = item.getValues()![1];
    expect(v2.getPosition().range.start).toBe(16);
    expect(v2.getPosition().range.end).toBe(22);

});