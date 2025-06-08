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

// TODO: Formatter is unfinished
// test("Indent container", () => {
//     const kvFile = 
// `   Test {
//  item1       val1
// item2 val2

// Test2 {
//           item3 val3       val4
// }
// }`;

//     const kvTree = parser.parseText(kvFile);
    
//     const originalRoot = kvTree.getRootItems()[0];
//     const root = formatter.indentItem(originalRoot, 0);
//     expect(root.getKey().getPosition().getRange().getStart()).toBe(0);
//     expect(root.getKey().getPosition().getRange().getEnd()).toBe(4);
//     expect(root.getOpeningBrace()?.getPosition().getRange().getStart()).toBe(6);
//     expect(root.getClosingBrace()?.getPosition().getRange().getStart()).toBe(0);

//     const item1 = root.getChildren()![0];
//     expect(item1.getKey().getPosition().getRange().getStart()).toBe(4);
//     expect(item1.getKey().getPosition().getRange().getEnd()).toBe(9);
//     expect(item1.getValues()![0].getPosition().getRange().getStart()).toBe(10);
//     expect(item1.getValues()![0].getPosition().getRange().getEnd()).toBe(14);
    
//     const item2 = root.getChildren()![1];
//     expect(item2.getKey().getPosition().getRange().getStart()).toBe(4);
//     expect(item2.getKey().getPosition().getRange().getEnd()).toBe(9);
//     expect(item2.getValues()![0].getPosition().getRange().getStart()).toBe(10);
//     expect(item2.getValues()![0].getPosition().getRange().getEnd()).toBe(14);
    
//     const item3 = root.getChildren()![2];
//     expect(item3.getKey().getPosition().getRange().getStart()).toBe(4);
//     expect(item3.getKey().getPosition().getRange().getEnd()).toBe(9);
//     expect(item3.getOpeningBrace()?.getPosition().getRange().getStart()).toBe(11);
//     expect(item3.getClosingBrace()?.getPosition().getRange().getStart()).toBe(4);

//     const item4 = item3.getChildren()![0];
//     expect(item4.getKey().getPosition().getRange().getStart()).toBe(8);
//     expect(item4.getKey().getPosition().getRange().getEnd()).toBe(13);
//     expect(item4.getValues()![0].getPosition().getRange().getStart()).toBe(14);
//     expect(item4.getValues()![0].getPosition().getRange().getEnd()).toBe(18);
//     expect(item4.getValues()![1].getPosition().getRange().getStart()).toBe(19);
//     expect(item4.getValues()![1].getPosition().getRange().getEnd()).toBe(23);
// });