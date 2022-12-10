# @tomsd/mongodbatlas

It's a library for MongoDB Atlas.  

## installation

``` shell
npm install @tomsd/mongodbatlas
```

## usage

import `MongoDbAtlas` class.

``` typescript
import { MongoDbAtlas } from "@tomsd/mongodbatlas";
```

create instance.

``` typescript
// initialize with your public key and private key
const mongoDbAtlas = new MongoDbAtlas(publicKey, privateKey);
```

and then, use some.

``` typescript
await mongoDbAtlas.projects.getAll();
```
