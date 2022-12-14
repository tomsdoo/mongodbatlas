# getting organization projects

``` typescript
await mongoDbAtlas
  .organization(orgId)
  .getProjects()
```

``` typescript
[
  {
    clusterCount: 1,
    created: "2000-01-01T00:00:00Z",
    id: "projectId",
    links: [],
    name: "projectName",
    orgId: "orgId",
  },
]
```
