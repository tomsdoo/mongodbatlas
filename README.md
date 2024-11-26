# @tomsd/mongodbatlas

It's a library for MongoDB Atlas.  
See [mongodbatlas.netlify.app](https://mongodbatlas.netlify.app/) also.

![npm](https://img.shields.io/npm/v/@tomsd/mongodbatlas?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/@tomsd/mongodbatlas?style=for-the-badge&logo=npm)
![release date](https://img.shields.io/github/release-date/tomsdoo/mongodbatlas?style=for-the-badge&logo=npm)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/mongodbatlas?style=for-the-badge&logo=npm)

![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/mongodbatlas/ci.yml?style=social&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/mongodbatlas/main?style=social&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/mongodbatlas?style=social&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2024?style=social&logo=github)
![depends on node greater or equal 18](https://img.shields.io/badge/node.js-%3E%3D%2018-lightyellow?style=social&logo=nodedotjs)

## installation
``` shell
npm install @tomsd/mongodbatlas
```

## usage

Import and use MongoDbAtlas class.

``` typescript
import { MongoDbAtlas } from "@tomsd/mongodbatlas";

const mongoDbAtlas = new MongoDbAtlas(
  PUBLIC_KEY,
  PRIVATE_KEY
);
```

### get projects

``` typescript
console.log(
  await mongoDbAtlas.projects.getAll()
);
```

## get one project

``` typescript
const projectId = "...";
await mongoDbAtlas.project(projectId).get();
```

## get users in project

``` typescript
await mongoDbAtlas.project(projectId).getUsers();
```
