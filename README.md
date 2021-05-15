# Soulution

> A web-app built on React and Google Cloud Firestore to help with structure problem solving.

&copy; 2021 James Angus

## Setup

This project requires `Firestore` and Firebase `Authentication` using login with Google.

The schema only needs a collection setup called `problems`.

For security rules, use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /problems/{document} {
      allow read, create, update, delete: if isAuthorized();
    }
    function isAuthorized() {
    	return request.auth.uid == resource.data.uid;
    }
  }
}
```

This app requires a Composite Index:

```yaml
Collection_ID: problems
Fields_Indexed:
  - 'uid Ascending'
  - 'LastUpdatedDate Descending'
Query_Scope: Collection
```

Finally, to secure the [authentication details](https://console.cloud.google.com/apis/credentials?folder=&organizationId=&project=soulution), lock down the `Browser Key` and `Oauth 2.0 Client IDs`.

For Browser Key, use `HTTP Referrers (website)`

1. https://soulution.firebaseapp.com/*
2. https://soulution.cloud/*
3. http://localhost:3000/*

For Web Client (Oauth 2.0 Client IDs), use `Authorised JavaScript Origins`:

1. https://soulution.firebaseapp.com
2. https://soulution.cloud
3. http://localhost:3000
4. http://localhost

Authorised redirect URIs should be:

```
https://soulution.firebaseapp.com/__/auth/handler
```