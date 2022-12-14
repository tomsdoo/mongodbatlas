# getting a cluster in project

``` typescript
await mongoDbAtlas
  .project(projectId)
  .cluster(clusterName)
  .get()
```

``` typescript
{
  autoScaling: {
     autoIndexingEnabled: false,
     compute: [],
     diskGBEnabled: false
   },    
   backupEnabled: false,
   biConnector: { enabled: false, readPreference: 'secondary' },
   clusterType: 'REPLICASET',
   connectionStrings: {
     standard: 'mongodb://',
     standardSrv: 'mongodb+srv://'
   },
   createDate: '2000-01-01T00:00:00Z',
   diskSizeGB: 0.5,
   encryptionAtRestProvider: 'NONE',
   groupId: 'projectId',
   id: 'clusterId',
   labels: [],
   links: [],
   mongoDBMajorVersion: '5.0',
   mongoDBVersion: '5.0.14',
   mongoURI: 'mongodb://',
   mongoURIUpdated: '2000-01-01T00:00:00Z',
   mongoURIWithOptions: 'mongodb://',
   name: 'clusterName',
   numShards: 1,
   paused: false,
   pitEnabled: false,
   providerBackupEnabled: false,
   providerSettings: {
     providerName: 'TENANT',
     autoScaling: [],
     backingProviderName: '',
     regionName: '',
     instanceSizeName: ''
  },
  replicationFactor: 3,
  replicationSpec: {},
  replicationSpecs: [],
  rootCertType: '',
  srvAddress: 'mongodb+srv://',
  stateName: 'IDLE',
  terminationProtectionEnabled: false,
  versionReleaseSystem: 'LTS'
}

```
