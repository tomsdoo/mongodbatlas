# deleting IP from access list

``` typescript
await mongoDbAtlas
  .project(projectId)
  .removeIP("xxx.xxx.xxx.xxx/xx")
```

for success

``` typescript
{
  status: 204,
  ...
}
```

for 404

``` typescript
{
  detail: "IP Address xxx.xxx.xxx.xxx/xx not on Atlas access list for group projectId",
  error: 404,
  errorCode: "ATLAS_NETWORK_PERMISSION_ENTRY_NOT_FOUND",
  parameters: [],
  reason: "Not Found",
}
```
