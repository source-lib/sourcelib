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
    expect((result! as any).prop1).toBe("string val");
    expect((result! as any).sub).toBeDefined();
    expect(result).toHaveProperty("sub.more", 10);
    expect(result).toHaveProperty("sub.stuff", "but nested");
    expect(result).toHaveProperty("sub.boolprop", false);
    expect(result).toHaveProperty("sub.boolpropa", true);
    expect(result).toHaveProperty("another prop", ["with", "multiple", "values"]);
    expect(result).toHaveProperty("floatprop", 4.5);
    expect(result).toHaveProperty("intprop", 90000);
});

test("Deserialize mdlinfo", () => {
   const doc = parseText(`"_hr/props/pedestal_button"
{
        "general"
        {
                "name"          "_hr/props/pedestal_button"
                "filename"              "/home/stefan/Projects/PortalRevolution2/game/revolution/models/_hr/props/pedestal_button.mdl"
                "id"            "1414743113"
                "version"               "49"
                "checksum"              "1323378053"
                "eye_pos"               "0.000000 0.000000 0.000000"
                "illum_pos"             "0.000000 0.000000 23.486897"
                "hull_min"              "-12.849852 -12.849851 -0.255160"
                "hull_max"              "12.849852 12.849851 47.038059"
                "bone_count"            "3"
                "attachment_count"              "0"
                "surfaceprop"           "default"
        }
        "materials"
        {
                "0"             "pedestal_button_blue"
                "1"             "pedestal_button_orange"
                "2"             "pedestal_button"
        }
        "cdmaterials"
        {
                "0"             "_hr/models/props/"
        }
        "mdlkeyvalue"
        {
                "qc_path"
                {
                        "value"         "models\\_hr\\props\\pedestal_button\\pedestal_button.qc"
                }
        }
}`);

    const nodes = KvSerializer.deserialize(doc, { detectArrays: true });
    expect(nodes).toHaveLength(1);

    expect(nodes[0]).toHaveProperty("general.name", "_hr/props/pedestal_button");
    expect(nodes[0]).toHaveProperty("general.filename", "/home/stefan/Projects/PortalRevolution2/game/revolution/models/_hr/props/pedestal_button.mdl");
    expect(nodes[0]).toHaveProperty("general.id", 1414743113);
    expect(nodes[0]).toHaveProperty("general.version", 49);
    expect(nodes[0]).toHaveProperty("general.checksum", 1323378053);
    expect(nodes[0]).toHaveProperty("general.eye_pos", "0.000000 0.000000 0.000000");
    expect(nodes[0]).toHaveProperty("general.illum_pos", "0.000000 0.000000 23.486897");
    expect(nodes[0]).toHaveProperty("general.hull_min", "-12.849852 -12.849851 -0.255160");
    expect(nodes[0]).toHaveProperty("general.hull_max", "12.849852 12.849851 47.038059");
    expect(nodes[0]).toHaveProperty("general.bone_count", 3);
    expect(nodes[0]).toHaveProperty("general.attachment_count", 0);
    expect(nodes[0]).toHaveProperty("general.surfaceprop", "default");

    expect(Array.isArray((nodes[0] as any).materials)).toBeTruthy();
    expect((nodes[0] as any).materials).toHaveLength(3);
    expect((nodes[0] as any).materials[0]).toBe("pedestal_button_blue");
    expect((nodes[0] as any).materials[1]).toBe("pedestal_button_orange");
    expect((nodes[0] as any).materials[2]).toBe("pedestal_button");

    expect(Array.isArray((nodes[0] as any).cdmaterials)).toBeTruthy();
    expect((nodes[0] as any).cdmaterials).toHaveLength(1);
    expect((nodes[0] as any).cdmaterials[0]).toBe("_hr/models/props/");

    expect(nodes[0]).toHaveProperty("mdlkeyvalue.qc_path.value", "models\\_hr\\props\\pedestal_button\\pedestal_button.qc");
});