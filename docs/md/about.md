# @tomsd/mongodbatlas

It's a library for MongoDB Atlas.  

![npm](https://img.shields.io/npm/v/@tomsd/mongodbatlas?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/@tomsd/mongodbatlas?style=for-the-badge&logo=npm)

![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/mongodbatlas/ci.yml?style=social&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/mongodbatlas/main?style=social&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/mongodbatlas?style=social&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2025?style=social&logo=github)
![depends on node greater or equal 18](https://img.shields.io/badge/node.js-%3E%3D%2018-lightyellow?style=social&logo=nodedotjs)

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
