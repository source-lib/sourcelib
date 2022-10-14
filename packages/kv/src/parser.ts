import { Tokenizer } from "tokenizer";

export class Item {
    private key: string;
    private children: Item[] | null;
    private values: string[] | null;
    private key

    private constructor(key: string) {
        this.key = key;
        this.children = null;
        this.values = null;
    }

    public static createLeaf(key: string, value: string[]): Item {
        const item = new Item(key);
        item.values = value;
        return item;
    }

    public static createContainer(key: string, children: Item[]): Item {
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

    public getKey(): string {
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