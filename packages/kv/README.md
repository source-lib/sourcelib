# @sourcelib/kv

Typescript library to tokenize, parse, inspect, analyse, reformat and do other language integrations for source engine keyvalue files.

## Installation

```bash
npm install @sourcelib/kv
```

## Usage

```typescript
import { tokenize, parse } from '@sourcelib/kv';

const tokens = tokenize(`
"KV" {
    "key" "value"
    "key2" "value2"
}`);

const kvTree = parse(tokens);
kvTree.getChildren()[0].getValues()[0].getValue(); // "value"
```
