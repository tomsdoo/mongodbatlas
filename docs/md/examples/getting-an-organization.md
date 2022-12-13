# getting an organization

``` typescript
await mongoDbAtlas
  .organization(orgId)
  .get()
```

``` typescript
{
  id: "orgId",
  isDeleted: false,
  links: [],
  name: "organizationName"
}
```
