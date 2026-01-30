import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import singleSourceOfTruth from "@/data/unified";

export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db("yashgoswami");
        const collection = db.collection("website");

        // 1. Clear existing documents
        await collection.deleteMany({});

        // 2. Insert fresh list from unified.js
        if (singleSourceOfTruth.data && singleSourceOfTruth.data.length > 0) {
            await collection.insertMany(singleSourceOfTruth.data);
        }

        return NextResponse.json({ message: 'Configuration restored to default successfully' });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to restore configuration' }, { status: 500 });
    }
}
