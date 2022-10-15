import * as parser from "./parser";
import * as tokenizer from "./tokenizer";

test("Parse 1 root no multiple values", () => {
    const kvFile = 
`Test { 
    "item1" "value1"
    "item2" "value2"

    "item3" {
        "item4" "value4"
    }

    "item5" {
        "item6" "value6"
        "item7" "value7"
    }
}`;
    const tokens = tokenizer.tokenize(kvFile);
    const kvTree = parser.parse(tokens);

    expect(kvTree.getRootItems().length).toBe(1);
    const root = kvTree.getRootItems()[0];
    expect(root.getKey().getContent()).toBe("Test");
    expect(root.getKey().getPosition().line).toBe(0);
    expect(root.getKey().getPosition().range.start).toBe(0);
    expect(root.getKey().getPosition().range.end).toBe(4);
    expect(root.getChildren()).not.toBeNull();
    expect(root.getChildren()!.length).toBe(4);

    const item1 = root.getChildren()![0];
    expect(item1.getKey().getContent()).toBe("\"item1\"");
    expect(item1.getKey().getPosition().line).toBe(1);
    expect(item1.getKey().getPosition().range.start).toBe(4);
    expect(item1.getKey().getPosition().range.end).toBe(11);
    expect(item1.getValues()).not.toBeNull();
    expect(item1.getValues()!.length).toBe(1);
    expect(item1.getValues()![0].getContent()).toBe("\"value1\"");
    expect(item1.getValues()![0].getPosition().line).toBe(1);
    expect(item1.getValues()![0].getPosition().range.start).toBe(12);
    expect(item1.getValues()![0].getPosition().range.end).toBe(20);

    const item2 = root.getChildren()![1];
    expect(item2.getKey().getContent()).toBe("\"item2\"");
    expect(item1.getKey().getPosition().line).toBe(1);
    expect(item1.getKey().getPosition().range.start).toBe(4);
    expect(item1.getKey().getPosition().range.end).toBe(11);
    expect(item2.getValues()).not.toBeNull();
    expect(item2.getValues()!.length).toBe(1);
    expect(item2.getValues()![0].getContent()).toBe("\"value2\"");
    expect(item2.getValues()![0].getPosition().range.start).toBe(12);
    expect(item2.getValues()![0].getPosition().range.end).toBe(20);

});