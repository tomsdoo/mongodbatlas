# How to create instance of MongoDbAtlas class

importing package and creating instance are like below.

``` typescript
import { MongoDbAtlas } from "@tomsd/mongodbatlas";

const mongoDbAtlas = new MongoDbAtlas(
  publicKey,
  privateKey
);
```

`publicKey` and `privateKey` are to be ready on your own, with MongoDB Atlas site.
