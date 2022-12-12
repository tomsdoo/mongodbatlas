# getting a project

``` typescript
await mongoDbAtlas
  .project(projectId)
  .get()
```

``` typescript
{
  clusterCount: 1,
  created: '2000-01-01T00:00:00Z',
  id: 'projectId',
  links: [
    {
      href: 'https://cloud.mongodb.com/api/atlas/v1.0/groups/projectId',
      rel: 'self'
    },
  ],
  name: 'projectName',
  orgId: 'orgId'
}
```

See [how to create an instance](./how-to-create-instance.md) if you'd like.  
See [Projects](../Projects.md) also.
