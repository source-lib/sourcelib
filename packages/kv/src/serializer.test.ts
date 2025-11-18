import {serialize} from "./serializer";

test("Serialize Object simple", () => {
    const obj = {
        prop1: "string val",
        prop2: 10,
        boolProp: false,
        boolProp2: true,
        dateProp: new Date(2004, 10, 11, 8, 10, 0),
    };

    const kvStr = serialize(obj);
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

    const kvStr = serialize(obj);
    expect(kvStr).toBe(`"Object" {
  "prop1" "string val"
  "sub" {
    "more" "10"
    "stuff" "but nested"
  }
}`);
});