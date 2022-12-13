# adding IP into access list

``` typescript
await mongoDbAtlas
  .project(projectId)
  .addIP("xxx.xxx.xxx.xxx/xx")
```

``` typescript
[
  links: [],
  results: [
    {
      cidrBlock: "xxx.xxx.xxx.xxx/xx",
      groupId: "projectId",
      links: [],
    },
  ],
  totalCount: 1,
]
```
