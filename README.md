# base64url

An isomorphic javascript "base64url" encoder/decoder with Buffer/TypedArray support.

## Install

```
npm install @xbaun/base64url
```

## Usage

For es6 modules:
```javascript

import * as base64url from '@xbaun/base64url';

```

For commonjs modules:

```javascript

const base64url = require('@xbaun/base64url');

```

## API

#### encode(value: string, encoding?: string): string;

```javascript

base64url.encode('abcd');   
// YWJjZA

```

#### decode(value: string, encoding?: string): string;

```javascript

base64url.decode('YWJjZA'); 
// abcd

```