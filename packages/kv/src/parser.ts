import { PositionedLiteral } from "parser-types";
import { Tokenizer } from "tokenizer";

export class Item {
    private key: PositionedLiteral;
    private children: Item[] | null;
    private values: string[] | null;

    private constructor(key: PositionedLiteral) {
        this.key = key;
        this.children = null;
        this.values = null;
    }

    public static createLeaf(key: PositionedLiteral, value: string[]): Item {
        const item = new Item(key);
        item.values = value;
        return item;
    }

    public static createContainer(key: PositionedLiteral, children: Item[]): Item {
        const item = new Item(key);
        item.children = children;
        return item;
    }

    public isLeaf(): boolean {
        return this.children == null;
    }

    public getValues(): string[] {
        return this.values!;
    }

    public getChildren(): Item[] {
        return this.children!;
    }

    public getKey(): PositionedLiteral {
        return this.key;
    }
}

export class Document {

    private rootItems: Item[];

    public constructor(rootItems: Item[]) {
        this.rootItems = rootItems;
    }

    public getRootItems(): Item[] {
        return this.rootItems;
    }

}