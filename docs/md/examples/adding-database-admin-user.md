# deleting database admin user

``` typescript
await mongoDbAtlas
  .project(projectId)
  .removeAdminUser(userName)
```

``` typescript
{
  awsIAMType: "NONE",
  databaseName: "admin",
  groupId: "projectId",
  labels: [],
  ldapAuthType: "NONE",
  links: [
    {
      href: "https://cloud.mongodb.com/api/atlas/v1.0/groups/projectId/databaseUsers/admin/username",
      rel: "self"
    }
  ],
  roles: [
    {
      databaseName: "admin",
      roleName: "atlasAdmin",
    },
  ],
  scopes: [],
  username: "username",
  x509Type: "NONE",
}
```
