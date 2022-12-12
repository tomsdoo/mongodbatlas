# getting database users

``` typescript
await mongoDbAtlas
  .project(projectId)
  .getUsers()
```

``` typescript
[
  {
    databaseName: "databaseName",
    groupId: "projectId",
    links: [],
    roles: [],
    scopes: [],
    username: "username"
  }
]
```
