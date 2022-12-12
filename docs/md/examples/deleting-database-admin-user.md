# deleting database admin user

``` typescript
await mongoDbAtlas
  .project(projectId)
  .removeAdminUser(userName)
```

``` typescript
{
  status: 204
}
```
