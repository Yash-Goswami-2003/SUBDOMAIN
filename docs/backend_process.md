# Backend Process: Batch Update (Delete & Insert)

The Admin Configuration System uses a **Batch Update** strategy (also known as "Truncate and Load") for updating documents. This ensures that the state of your MongoDB collection exactly reflects what you see in the Monaco Editor.

## How it works

When you hit the **Submit** button with the **POST** method selected, the following steps occur at the backend in `src/app/api/admin/documents/route.js`:

### 1. Identify the Scope
The backend receives a `filter` object (defined in your Monaco Filter Editor) and an array of `documents` (from the main JSON Editor).

### 2. Delete Existing Documents
The database first removes all documents that match the provided `filter`.
```javascript
// From src/app/api/admin/documents/route.js
await collection.deleteMany(filter);
```
**Why?** This prevents "orphaned" documents. If you removed a document in the editor and we only used `update` or `upsert`, that removed document would still exist in the database.

### 3. Insert New Documents
The backend then takes the list of documents from your editor and inserts them as fresh documents into the collection.
```javascript
// From src/app/api/admin/documents/route.js
if (documents.length > 0) {
    const docsToInsert = documents.map(doc => {
        const { _id, ...rest } = doc; // Strip existing MongoDB IDs
        return rest;
    });
    await collection.insertMany(docsToInsert);
}
```

## Benefits of this approach

1.  **Consistency**: What you see is what you get. The editor becomes the absolute source of truth for the filtered scope.
2.  **Order Preservation**: While MongoDB doesn't strictly guarantee order, batch insertion is more predictable than individual updates.
3.  **Simplicity**: Avoids complex "diffing" logic on the server, making the system faster and less prone to edge-case bugs during partial updates.

## Precautions

> [!WARNING]
> Since this process deletes documents before inserting new ones, ensure your JSON is valid and complete before submitting. The system includes a JSON syntax check on the frontend to help prevent accidental data loss from invalid JSON.
