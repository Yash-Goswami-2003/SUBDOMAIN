import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const filterStr = searchParams.get('filter');

    let filter = {};
    if (filterStr) {
        try {
            filter = JSON.parse(filterStr);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid filter JSON' }, { status: 400 });
        }
    }

    try {
        const client = await connectToDatabase();
        const db = client.db("yashgoswami");
        const documents = await db.collection("website")
            .find(filter)
            .toArray();

        return NextResponse.json(documents);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { documents, filter } = await request.json();

        if (!Array.isArray(documents)) {
            return NextResponse.json({ error: 'Expected an array of documents' }, { status: 400 });
        }

        if (!filter || typeof filter !== 'object') {
            return NextResponse.json({ error: 'Filter object is required for batch update' }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db("yashgoswami");
        const collection = db.collection("website");

        // BATCH UPDATE PROCESS:
        // 1. Delete all documents that match the current filter.
        // 2. Insert the new list of documents from the editor.
        // This ensures the database state exactly matches the UI for that filter scope.

        await collection.deleteMany(filter);

        if (documents.length > 0) {
            // Remove _id from documents to avoid duplicate key errors
            const docsToInsert = documents.map(doc => {
                const { _id, ...rest } = doc;
                return rest;
            });
            await collection.insertMany(docsToInsert);
        }

        return NextResponse.json({
            message: `Successfully replaced ${documents.length} documents matching the filter.`,
            count: documents.length
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to update documents' }, { status: 500 });
    }
}
