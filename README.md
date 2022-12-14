# @tomsd/mongodbatlas

It's a library for MongoDB Atlas.  
See [mongodbatlas.netlify.app](https://mongodbatlas.netlify.app/) also.

![npm](https://img.shields.io/npm/v/@tomsd/mongodbatlas)
![NPM](https://img.shields.io/npm/l/@tomsd/mongodbatlas)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@tomsd/mongodbatlas)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/mongodbatlas)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

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
