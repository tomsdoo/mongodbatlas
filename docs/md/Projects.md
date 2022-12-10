# Projects

`Projects` class is for project operation.

``` mermaid
classDiagram

class Projects {
  +constructor(publicKey: string, privateKey: string)
  +getAll() Promise~ProjectInfo[]~
  +add(orgId: string, name: string) Promise~Project~
}

class ProjectInfo {
  <<interface>>
  +string id
  +string name
  +string href
  +string orgId
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

Projects -- Project : .
Projects -- ProjectInfo : .

```
