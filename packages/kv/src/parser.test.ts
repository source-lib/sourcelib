/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import { ParseErrorType } from "./parser-types";
import * as parser from "./parser";

test("Parse simple", () => {
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
    const kvTree = parser.parseText(kvFile);
    
    expect(kvTree.getErrors().length).toBe(0);
    expect(kvTree.getRootItems().length).toBe(1);
    const root = kvTree.getRootItems()[0];
    expect(root.getKey().getContent()).toBe("Test");
    expect(root.getKey().getPosition().line).toBe(0);
    expect(root.getKey().getPosition().range.start).toBe(0);
    expect(root.getKey().getPosition().range.end).toBe(4);
    expect(root.hasCondition()).toBeFalsy();
    expect(root.getCondition()).toBeNull();
    expect(root.getChildren()).not.toBeNull();
    expect(root.getChildren()!.length).toBe(4);

    const item1 = root.getChildren()![0];
    expect(item1.isRoot()).toBeFalsy();
    expect(item1.isLeaf()).toBeTruthy();
    expect(item1.getParent()).toBe(root);
    expect(item1.getKey().getContent()).toBe("\"item1\"");
    expect(item1.getKey().getPosition().line).toBe(1);
    expect(item1.getKey().getPosition().range.start).toBe(4);
    expect(item1.getKey().getPosition().range.end).toBe(11);
    expect(item1.hasCondition()).toBeFalsy();
    expect(item1.getCondition()).toBeNull();
    expect(item1.getValues()).not.toBeNull();
    expect(item1.getValues()!.length).toBe(1);
    expect(item1.getValues()![0].getContent()).toBe("\"value1\"");
    expect(item1.getValues()![0].getPosition().line).toBe(1);
    expect(item1.getValues()![0].getPosition().range.start).toBe(12);
    expect(item1.getValues()![0].getPosition().range.end).toBe(20);

    const item2 = root.getChildren()![1];
    expect(item2.isRoot()).toBeFalsy();
    expect(item2.isLeaf()).toBeTruthy();
    expect(item2.getParent()).toBe(root);
    expect(item2.getKey().getContent()).toBe("\"item2\"");
    expect(item2.getKey().getPosition().line).toBe(2);
    expect(item2.getKey().getPosition().range.start).toBe(4);
    expect(item2.getKey().getPosition().range.end).toBe(11);
    expect(item2.hasCondition()).toBeFalsy();
    expect(item2.getCondition()).toBeNull();
    expect(item2.getValues()).not.toBeNull();
    expect(item2.getValues()!.length).toBe(1);
    expect(item2.getValues()![0].getContent()).toBe("\"value2\"");
    expect(item2.getValues()![0].getPosition().line).toBe(2);
    expect(item2.getValues()![0].getPosition().range.start).toBe(12);
    expect(item2.getValues()![0].getPosition().range.end).toBe(20);

    const item3 = root.getChildren()![2];
    expect(item3.isRoot()).toBeFalsy();
    expect(item3.isLeaf()).toBeFalsy();
    expect(item3.getParent()).toBe(root);
    expect(item3.getKey().getContent()).toBe("\"item3\"");
    expect(item3.getKey().getPosition().line).toBe(4);
    expect(item3.getKey().getPosition().range.start).toBe(4);
    expect(item3.getKey().getPosition().range.end).toBe(11);
    expect(item3.hasCondition()).toBeFalsy();
    expect(item3.getCondition()).toBeNull();
    expect(item3.getValues()).toBeNull();
    expect(item3.getChildren()).not.toBeNull();
    expect(item3.getChildren()!.length).toBe(1);

    const item4 = item3.getChildren()![0];
    expect(item4.isRoot()).toBeFalsy();
    expect(item4.isLeaf()).toBeTruthy();
    expect(item4.getParent()).toBe(item3);
    expect(item4.getKey().getContent()).toBe("\"item4\"");
    expect(item4.getKey().getPosition().line).toBe(5);
    expect(item4.getKey().getPosition().range.start).toBe(8);
    expect(item4.getKey().getPosition().range.end).toBe(15);
    expect(item4.hasCondition()).toBeFalsy();
    expect(item4.getCondition()).toBeNull();
    expect(item4.getValues()).not.toBeNull();
    expect(item4.getValues()!.length).toBe(1);
    expect(item4.getValues()![0].getContent()).toBe("\"value4\"");
    expect(item4.getValues()![0].getPosition().line).toBe(5);
    expect(item4.getValues()![0].getPosition().range.start).toBe(16);
    expect(item4.getValues()![0].getPosition().range.end).toBe(24);

    const item5 = root.getChildren()![3];
    expect(item5.isRoot()).toBeFalsy();
    expect(item5.isLeaf()).toBeFalsy();
    expect(item5.getParent()).toBe(root);
    expect(item5.getKey().getContent()).toBe("\"item5\"");
    expect(item5.getKey().getPosition().line).toBe(8);
    expect(item5.getKey().getPosition().range.start).toBe(4);
    expect(item5.getKey().getPosition().range.end).toBe(11);
    expect(item5.hasCondition()).toBeFalsy();
    expect(item5.getCondition()).toBeNull();
    expect(item5.getValues()).toBeNull();
    expect(item5.getChildren()).not.toBeNull();
    expect(item5.getChildren()!.length).toBe(2);

    const item6 = item5.getChildren()![0];
    expect(item6.isRoot()).toBeFalsy();
    expect(item6.isLeaf()).toBeTruthy();
    expect(item6.getParent()).toBe(item5);
    expect(item6.getKey().getContent()).toBe("\"item6\"");
    expect(item6.getKey().getPosition().line).toBe(9);
    expect(item6.getKey().getPosition().range.start).toBe(8);
    expect(item6.getKey().getPosition().range.end).toBe(15);
    expect(item6.hasCondition()).toBeFalsy();
    expect(item6.getCondition()).toBeNull();
    expect(item6.getValues()).not.toBeNull();
    expect(item6.getValues()!.length).toBe(1);
    expect(item6.getValues()![0].getContent()).toBe("\"value6\"");
    expect(item6.getValues()![0].getPosition().line).toBe(9);
    expect(item6.getValues()![0].getPosition().range.start).toBe(16);
    expect(item6.getValues()![0].getPosition().range.end).toBe(24);

    const item7 = item5.getChildren()![1];
    expect(item7.isRoot()).toBeFalsy();
    expect(item7.isLeaf()).toBeTruthy();
    expect(item7.getParent()).toBe(item5);
    expect(item7.getKey().getContent()).toBe("\"item7\"");
    expect(item7.getKey().getPosition().line).toBe(10);
    expect(item7.getKey().getPosition().range.start).toBe(8);
    expect(item7.getKey().getPosition().range.end).toBe(15);
    expect(item7.hasCondition()).toBeFalsy();
    expect(item7.getCondition()).toBeNull();
    expect(item7.getValues()).not.toBeNull();
    expect(item7.getValues()!.length).toBe(1);
    expect(item7.getValues()![0].getContent()).toBe("\"value7\"");
    expect(item7.getValues()![0].getPosition().line).toBe(10);
    expect(item7.getValues()![0].getPosition().range.start).toBe(16);
    expect(item7.getValues()![0].getPosition().range.end).toBe(24);
    
});

test("Parse with condition", () => {

    const kvFile = 
`Test {
    "item1" "value1" [$Debug]

    "container" [$Debug2] {
        "item2" "value2"
    }
}`;

    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getErrors().length).toBe(0);
    const root = kvTree.getRootItems()[0];
    expect(root.hasCondition()).toBeFalsy();
    expect(root.getCondition()).toBeNull();

    const item1 = root.getChildren()![0];
    expect(item1.hasCondition()).toBeTruthy();
    expect(item1.getCondition()!.conditionalString).toBe("[$Debug]");

    const container = root.getChildren()![1];
    expect(container.hasCondition()).toBeTruthy();
    expect(container.getCondition()!.conditionalString).toBe("[$Debug2]");
    expect(container.getChildren()![0].hasCondition()).toBeFalsy();
    expect(container.getChildren()![0].getCondition()).toBeNull();

});

test("Parse multiple roots", () => {
    
    const kvFile =
`Test1 {
    "item1" "value1"
}
Test2 {
    "item2" "value2"
}`;

    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getErrors().length).toBe(0);
    expect(kvTree.getRootItems().length).toBe(2);
    const root1 = kvTree.getRootItems()[0];
    expect(root1.getKey().getContent()).toBe("Test1");
    expect(root1.getChildren()!.length).toBe(1);
    expect(root1.getChildren()![0].getKey().getContent()).toBe("\"item1\"");
    expect(root1.getChildren()![0].getValues()![0].getContent()).toBe("\"value1\"");
    const root2 = kvTree.getRootItems()[1];
    expect(root2.getKey().getContent()).toBe("Test2");
    expect(root2.getChildren()!.length).toBe(1);
    expect(root2.getChildren()![0].getKey().getContent()).toBe("\"item2\"");
    expect(root2.getChildren()![0].getValues()![0].getContent()).toBe("\"value2\"");

});

test("Parse multiple values", () => {

    const kvFile =
`Test {
    "item1" "value1" "value2"
}`;

    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getRootItems().length).toBe(1);
    const root = kvTree.getRootItems()[0];
    expect(root.getKey().getContent()).toBe("Test");
    expect(root.getChildren()!.length).toBe(1);
    expect(root.getChildren()![0].getKey().getContent()).toBe("\"item1\"");
    expect(root.getChildren()![0].getValues()!.length).toBe(2);
    expect(root.getChildren()![0].getValues()![0].getContent()).toBe("\"value1\"");
    expect(root.getChildren()![0].getValues()![1].getContent()).toBe("\"value2\"");

});

test("Parse Error No Root", () => {

    const kvFile = 
`"key" "value"

"Elem" {
    "legalkey" "legalvalue"
}

"key2" "value2"
`;
    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getRootItems().length).toBe(1);
    expect(kvTree.getErrors().length).toBe(2);

    const err1 = kvTree.getErrors()[0];
    expect(err1.type).toBe(ParseErrorType.MissingRootObject);
    expect(err1.position.line).toBe(0);
    expect(err1.position.range.start).toBe(0);
    expect(err1.position.range.end).toBe(13);

    const err2 = kvTree.getErrors()[1];
    expect(err2.type).toBe(ParseErrorType.MissingRootObject);
    expect(err2.position.line).toBe(6);
    expect(err2.position.range.start).toBe(0);
    expect(err2.position.range.end).toBe(15);

});

test("Parse Error No Values", () => {

    const kvFile =
`Tests {
    key1
    key2

    key3 value1
}`;

    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getRootItems().length).toBe(1);
    expect(kvTree.getErrors().length).toBe(2);

    const root = kvTree.getRootItems()[0];
    expect(root.isRoot()).toBeTruthy();
    expect(root.isLeaf()).toBeFalsy();
    expect(root.getChildren()!.length).toBe(3);

    const item1 = root.getChildren()![0];
    expect(item1.isLeaf()).toBeTruthy();
    expect(item1.getKey().getContent()).toBe("key1");
    expect(item1.getValues()!.length).toBe(0);

    const item2 = root.getChildren()![1];
    expect(item2.isLeaf()).toBeTruthy();
    expect(item2.getKey().getContent()).toBe("key2");
    expect(item2.getValues()!.length).toBe(0);

    const item3 = root.getChildren()![2];
    expect(item3.isLeaf()).toBeTruthy();
    expect(item3.getKey().getContent()).toBe("key3");
    expect(item3.getValues()!.length).toBe(1);

    const errors = kvTree.getErrors();
    expect(errors[0].type).toBe(ParseErrorType.MissingValue);
    expect(errors[0].position.line).toBe(1);
    expect(errors[0].position.range.start).toBe(4);
    expect(errors[0].position.range.end).toBe(8);
    expect(errors[1].type).toBe(ParseErrorType.MissingValue);
    expect(errors[1].position.line).toBe(2);
    expect(errors[1].position.range.start).toBe(4);
    expect(errors[1].position.range.end).toBe(8);

});

test("Parse Error Unexpected Opening Brace", () => {
    const kvFile = 
`Test {
    {


}`;

    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getRootItems().length).toBe(1);
    expect(kvTree.getErrors().length).toBe(1);
    const err = kvTree.getErrors()[0];
    expect(err.type).toBe(ParseErrorType.UnexpectedOpeningBrace);
    expect(err.position.line).toBe(1);
    expect(err.position.range.start).toBe(4);
    expect(err.position.range.end).toBe(5);
});

test("Parse Error Unexpected Closing Brace", () => {
    const kvFile = 
`Test {
    "key" "value"
    }
}`;

    const kvTree = parser.parseText(kvFile);
    expect(kvTree.getRootItems().length).toBe(1);
    expect(kvTree.getErrors().length).toBe(1);
    const err = kvTree.getErrors()[0];
    expect(err.type).toBe(ParseErrorType.UnexpectedClosingBrace);
    expect(err.position.line).toBe(3);
    expect(err.position.range.start).toBe(0);
    expect(err.position.range.end).toBe(1);
});