# Organization

`Organization` class is for organization operation.

``` mermaid
classDiagram

class Organization {
  +constructor(publicKey: string, privateKey: string, orgId: string)
  +getUsers() Promise~User[]~
  +getProjects() Promise~Project[]~
}

class Project {
  <<interface>>
  +number clusterCount
  +string created
  +string id
  +Array links
  +string name
  +string orgId
}

class User {
  <<interface>>
  +string country
  +string created
  +string emailAddress
  +string firstName
  +string id
  +string lastAuth
  +string lastName
  +Array links
  +string mobileNumber
  +Array roles
  +Array teamIds
  +string username
}

Organization -- Project :  
Organization -- User : .

```
