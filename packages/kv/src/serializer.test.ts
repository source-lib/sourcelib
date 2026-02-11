import {KvSerializer} from "./serializer";
import {parseText} from "./parser";

test("Serialize Object simple", () => {
    const obj = {
        prop1: "string val",
        prop2: 10,
        boolProp: false,
        boolProp2: true,
        dateProp: new Date(2004, 10, 11, 8, 10, 0),
    };

    const kvStr = KvSerializer.serialize(obj);
    expect(kvStr).toBe(`"Object" {
  "prop1" "string val"
  "prop2" "10"
  "boolProp" "false"
  "boolProp2" "true"
  "dateProp" "Thu Nov 11 2004 08:10:00 GMT+0100 (Central European Standard Time)"
}`);
});

test("Serialize Object nested", () => {
    const obj = {
        prop1: "string val",
        sub: {
            more: 10,
            stuff: "but nested"
        }
    };

    const kvStr = KvSerializer.serialize(obj);
    expect(kvStr).toBe(`"Object" {
  "prop1" "string val"
  "sub" {
    "more" "10"
    "stuff" "but nested"
  }
}`);
});

test("Deserialize Item", () => {
    const doc = parseText(`"Object" {
        "prop1" "string val"
        "sub" {
            "more" "10"
            "stuff" "but nested"
            boolprop false
            boolpropa true
        }
        
        "another prop" with multiple values
        "floatprop" 4.50
        "intprop" 90000
    }`);

    const nodes = KvSerializer.deserialize(doc);
    expect(nodes).toHaveLength(1);
    const result = nodes[0];

    expect(result).toBeDefined();
    expect(result!.prop1).toBe("string val");
    expect(result!.sub).toBeDefined();
    expect(result).toHaveProperty("sub.more", 10);
    expect(result).toHaveProperty("sub.stuff", "but nested");
    expect(result).toHaveProperty("sub.boolprop", false);
    expect(result).toHaveProperty("sub.boolpropa", true);
    expect(result).toHaveProperty("another prop", ["with", "multiple", "values"]);
    expect(result).toHaveProperty("floatprop", 4.5);
    expect(result).toHaveProperty("intprop", 90000);
});