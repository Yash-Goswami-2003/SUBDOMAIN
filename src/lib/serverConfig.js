import clientPromise from "./mongodb";

export async function fetchServerConfig() {
    try {
        const client = await clientPromise;
        const db = client.db("yashgoswami");
        const data = await db.collection("website").find({}).toArray();
        // Convert _id to string to avoid serialization issues
        return data.map(doc => ({
            ...doc,
            _id: doc._id.toString()
        }));
    } catch (error) {
        console.error("Failed to fetch server config:", error);
        return []; // Return empty array on failure
    }
}
