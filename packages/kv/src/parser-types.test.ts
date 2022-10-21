import * as pt from "./parser-types";

describe("Range", () => {
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
        const key = new pt.Literal(new pt.Position(0, new pt.Range(0, 5)), "item1");
        const values = [new pt.Literal(new pt.Position(0, new pt.Range(6, 10)), "value1")];
        const item1 = pt.Item.createLeaf(null, key, values);
        expect(item1.isLeaf()).toBe(true);
        expect(item1.getValues()).toEqual(values);
        expect(item1.getKey().getContent()).toBe("item1");
    });
});

describe("Literal", () => {
    test("Literal getUnquoted", () => {
        const literal = new pt.Literal(new pt.Position(0, new pt.Range(0, 6)), "\"TEST\"");
        const literalContent = literal.asUnquoted();
        
        // Ensure that original literal didn't mutate
        expect(literal.getContent()).toBe("\"TEST\"");
        expect(literal.getPosition().getLine()).toBe(0);
        expect(literal.getPosition().getRange().getStart()).toBe(0);
        expect(literal.getPosition().getRange().getEnd()).toBe(6);

        expect(literalContent.getContent()).toBe("TEST");
        expect(literalContent.getPosition().getLine()).toBe(0);
        expect(literalContent.getPosition().getRange().getStart()).toBe(1);
        expect(literalContent.getPosition().getRange().getEnd()).toBe(5);
    });

    test("Literal isValid Success", () => {
        const literal = new pt.Literal(new pt.Position(1, new pt.Range(3, 10)), "Success");
        
        expect(literal.isValid()).toBe(true);
    });

    test("Literal isValid Fail", () => {
        const literal = new pt.Literal(new pt.Position(1, new pt.Range(3, 11)), "Success");
        
        expect(literal.isValid()).toBe(false);
    });

});
