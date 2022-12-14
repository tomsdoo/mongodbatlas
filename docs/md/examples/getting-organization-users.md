# getting organization users

``` typescript
await mongoDbAtlas
  .organization(orgId)
  .getUsers()
```

``` typescript
[
  {
    country: "country",
    createdAt: "2000-01-01T00:00:00Z",
    emailAddress: "someone@wher.ever",
    firstName: "firstName",
    id: "userId",
    lastAuth: "2000-01-01T00:00:00Z",
    lastName: "lastName",
    links: [],
    mobileNumber: "",
    roles: [],
    teamIds: [],
    username: "someone@wher.ever",
  },
]
```
