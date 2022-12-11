# getting all projects

get all projects you can see.  
See [how to create an instance](./how-to-create-instance.md) if you'd like.

``` typescript
await mongoDbAtlas.projects.getAll()
```

``` typescript
[
  {
    id: 'projectId',
    name: 'projectName',
    href: 'https://cloud.mongodb.com/api/atlas/v1.0/groups/projectId',
    orgId: 'orgId'
  },
]
```
