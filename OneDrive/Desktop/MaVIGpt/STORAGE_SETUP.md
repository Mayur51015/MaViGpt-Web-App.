# Firebase Storage Rules Setup

## Issue
Profile picture uploads may fail due to missing Firebase Storage security rules.

## Solution

You need to deploy the Firebase Storage rules to allow profile picture uploads.

### Option 1: Using Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Storage** → **Rules**
4. Replace the existing rules with the content from `storage.rules`:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload and read their own profile pictures
    match /profile-pictures/{userId}/{fileName} {
      allow read: if true; // Anyone can read profile pictures
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Deny all other access by default
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

5. Click **Publish**

### Option 2: Using Firebase CLI

If you have Firebase CLI installed:

```bash
firebase deploy --only storage
```

## Testing

After deploying the rules:

1. Navigate to http://localhost:5173/profile
2. Try uploading a profile picture
3. Check the browser console (F12) for detailed logs
4. You should see:
   - "Uploading profile picture for user: [your-user-id]"
   - "Upload successful, URL: [firebase-storage-url]"
   - "Profile updated successfully"

## Common Errors

### "Storage permission denied"
- **Cause**: Storage rules not deployed
- **Fix**: Deploy the storage rules using one of the options above

### "Firestore permission denied"
- **Cause**: Firestore rules don't allow writing to users collection
- **Fix**: Update Firestore rules to allow authenticated users to write their own profile

## Debugging

Open browser console (F12) and check for detailed error messages. The profile service now logs:
- Upload progress
- Firebase Auth updates
- Firestore updates
- Any errors with specific codes
