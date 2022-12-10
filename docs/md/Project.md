# Project

`Project` class is for project operations.

``` mermaid
classDiagram

class Project {
  +constructor(publicKey: string, privateKey: string, projectId: string)
  +clusters: Clusters
  +cluster(clusterName: string) Cluster
  +get(): Promise~any~
  +getFreeClusters() Promise~ClusterInfo[]~
  +getUsers() Promise~DatabaseUser[]~
  +addAdminUser(username: string, password: string) Promise~DatabaseUser~
  +removeAdminUser(username: string) Promise~any~
  +getIPs() Promise~Access[]~
  +addIP(ip: string) Promise~any~
  +removeIP(ip: string) Promise~any~
}

class ClusterInfo {
  <<interface>>
  +object autoScaling
  +boolean backupEnabled
  +string clusterType
  +string groupId
  +string id
  +string mongoDBVersion
  +string mongoDBMajorVersion
  +string name
  +string srvAddress
}

class DatabaseUser {
  <<interface>>
  +string groupId
  +Array roles
  +string username
}

class Access {
  <<interface>>
  +string cidrBlock
  +string groupId
}

Project -- ClusterInfo : .
Project -- DatabaseUser : .
Project -- Access : .

```
