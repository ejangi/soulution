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
    	return request.auth.uid == '<your user id here>';
    }
  }
}
```