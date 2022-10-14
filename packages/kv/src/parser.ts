import { Tokenizer } from "tokenizer";

export class Item {
    private name: string;
    private children: Item[] | null;
    private values: string[] | null;

    private constructor(name: string) {
        this.name = name;
        this.children = null;
        this.values = null;
    }

    public static createLeaf(name: string, value: string[]): Item {
        const item = new Item(name);
        item.values = value;
        return item;
    }

    public static createContainer(name: string, children: Item[]): Item {
        const item = new Item(name);
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

    public getName(): string {
        return this.name;
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