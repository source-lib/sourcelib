import { Item, Literal, Position, Range } from "./parser-types";

describe("Range", () => {
    test("Construct valid Success", () => {
        expect(() => {
            new Range(1, 2);
        }).not.toThrow();
    });
    test("Construct less than zero start Fail", () => {
        expect(() => {
            new Range(-1, 2);
        }).toThrowError();
    });
    test("Construct end less than start Fail", () => {
        expect(() => {
            new Range(3, 2);
        }).toThrowError();
    });
    test("Construct float start Fail", () => {
        expect(() => {
            new Range(3.3, 2);
        }).toThrowError();
    });
    test("Construct float end Fail", () => {
        expect(() => {
            new Range(1, 2.4);
        }).toThrowError();
    });

    test("Range intersecting Success", () => {
        const range1 = new Range(0, 5);
        const range2 = new Range(3, 10);
        expect(range1.isIntersecting(range2)).toBe(true);
        expect(range2.isIntersecting(range1)).toBe(true);
    });
    
    test("Range intersecting Fail", () => {
        const range1 = new Range(0, 5);
        const range2 = new Range(6, 10);
        expect(range1.isIntersecting(range2)).toBe(false);
        expect(range2.isIntersecting(range1)).toBe(false);
    });
    
    test("Item create leaf Success", () => {
        const key = new Literal(new Position(0, new Range(0, 5)), "item1");
        const values = [new Literal(new Position(0, new Range(6, 10)), "value1")];
        const item1 = Item.createLeaf(null, key, values);
        expect(item1.isLeaf()).toBe(true);
        expect(item1.getValues()).toEqual(values);
        expect(item1.getKey().getContent()).toBe("item1");
    });
});

describe("Literal", () => {
    test("Literal getUnquoted Success", () => {
        const literal = new Literal(new Position(0, new Range(0, 6)), "\"TEST\"");
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
        const literal = new Literal(new Position(1, new Range(3, 10)), "Success");
        
        expect(literal.isValid()).toBe(true);
    });

    test("Literal isValid Fail", () => {
        const literal = new Literal(new Position(1, new Range(3, 11)), "Success");
        
        expect(literal.isValid()).toBe(false);
    });

});
