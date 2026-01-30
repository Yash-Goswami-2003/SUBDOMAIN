/* eslint-disable no-var */
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO;
const options = {};

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

/**
 * Connect to MongoDB safely.
 * This is a "Lazy Connection" - it only connects when called.
 * This prevents build failures if the IP is blocked but data isn't needed immediately.
 */
async function connectToDatabase() {
    if (clientPromise) {
        return clientPromise;
    }

    if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }
    return clientPromise;
}

// Export the function, not the promise directly
export default connectToDatabase;
