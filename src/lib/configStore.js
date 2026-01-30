class ConfigStore {
    constructor() {
        this.cache = [];
        this.isHydrated = false;
    }

    /**
     * Hydrate the store with initial data (usually from server component)
     */
    hydrate(data) {
        if (!data) return;
        this.cache = data;
        this.isHydrated = true;
    }

    /**
     * Fetch all relevant config documents.
     * On server: fetches directly from MongoDB.
     * On client: fetches from API if not hydrated.
     */
    async fetchAll() {
        if (typeof window === 'undefined') {
            // Server-side: Should be hydrated manually via hydrate() if used on server,
            // or use serverConfig.js directly. We return cache here to avoid errors.
            return this.cache;
        }

        if (this.isHydrated) return this.cache;

        // Client-side: API call
        try {
            const res = await fetch('/api/admin/documents');
            if (res.ok) {
                this.cache = await res.json();
                this.isHydrated = true;
            }
        } catch (error) {
            console.error('Failed to fetch config:', error);
        }
        return this.cache;
    }

    /**
     * Get documents by type from the cache
     */
    getByType(type) {
        return this.cache.filter(doc => doc.documentType === type);
    }

    /**
     * Get a single document by type (convenience method)
     */
    getSingleByType(type) {
        return this.cache.find(doc => doc.documentType === type);
    }
}

// Export a single instance
const configStore = new ConfigStore();
export default configStore;
