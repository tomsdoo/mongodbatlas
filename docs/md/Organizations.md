# Organizations

`Organizations` class is for organization operation.

``` mermaid
classDiagram

class Organizations {
  +constructor(publicKey: string, privateKey: string)
  +getAll() Promise~Organization[]~
}

class Organization {
  <<interface>>
  +string id
  +boolean isDeleted
  +Array links
  +string name
}

Organizations -- Organization : .
```
