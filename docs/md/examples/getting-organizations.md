# getting organizations

``` typescript
await mongoDbAtlas
  .organizations
  .getAll()
```

``` typescript
[
  {
    id: "organizationId",
    isDeleted: false,
    links: [],
    name: "organizationName"
  }
]
```
