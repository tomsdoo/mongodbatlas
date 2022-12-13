# getting access list

``` typescript
await mongoDbAtlas
  .project(projectId)
  .getIPs()
```

``` typescript
[
  {
    cidrBlock: '111.111.111.111/24',
    comment: '',
    groupId: 'projectId',
    links: []
  }
]
```
