# MongoDbAtlas

`MongoDbAtlas` class is an entry class for the users.  
The users can get other class instances via it.  

``` typescript
const mongoDbAtlas = new MongoDbAtlas(
  publicKey,
  privateKeys
);
```

``` typescript
const projects = mongoDbAtlas
  .projects;
```

``` typescript
const project = mongoDbAtlas
  .project(projectId);
```

``` typescript
const organizations = mongoDbAtlas
  .organizations;
```

``` typescript
const organization = mongoDbAtlas
  .organization(orgId);
```

``` mermaid
classDiagram

class MongoDbAtlas {
  +Organizations organizations
  +Projects projects
  +constructor(publicKey: string, privateKey: string)
  +organization(orgId: string) Organization
  +project(projectId: string) Project
}

```
