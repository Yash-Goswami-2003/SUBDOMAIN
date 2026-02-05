import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

const parseId = (value) => {
    const id = Number(value);
    return Number.isFinite(id) ? id : null;
};

const normalizeProject = (project = {}, fallbackId = null) => {
    const id = parseId(project.id) ?? fallbackId;
    return {
        documentType: "project",
        id,
        title: typeof project.title === "string" ? project.title.trim() : "",
        description: typeof project.description === "string" ? project.description.trim() : "",
        longDescription: typeof project.longDescription === "string" ? project.longDescription.trim() : "",
        image: typeof project.image === "string" ? project.image.trim() : "",
        technologies: Array.isArray(project.technologies) ? project.technologies.filter(Boolean) : [],
        category: typeof project.category === "string" ? project.category.trim() : "",
        featured: Boolean(project.featured),
        liveUrl: typeof project.liveUrl === "string" ? project.liveUrl.trim() : "",
        githubUrl: typeof project.githubUrl === "string" ? project.githubUrl.trim() : ""
    };
};

const getNextProjectId = async (collection) => {
    const latest = await collection.find({ documentType: "project" }).sort({ id: -1 }).limit(1).toArray();
    const maxId = parseId(latest?.[0]?.id) ?? 0;
    return maxId + 1;
};

export async function GET() {
    try {
        const client = await connectToDatabase();
        const db = client.db("yashgoswami");
        const collection = db.collection("website");

        const projects = await collection
            .find({ documentType: "project" })
            .toArray();

        const updates = [];
        let nextId = 1;

        for (const project of projects) {
            const id = parseId(project.id);
            if (id && id >= nextId) nextId = id + 1;
        }

        const assignedIds = new Set();
        const normalized = projects.map((project, index) => {
            let id = parseId(project.id);
            if (!id || assignedIds.has(id)) {
                id = nextId;
                nextId += 1;
                updates.push({
                    updateOne: {
                        filter: { _id: project._id },
                        update: { $set: { id } }
                    }
                });
            }
            assignedIds.add(id);
            return normalizeProject({ ...project, id }, index + 1);
        });

        if (updates.length > 0) {
            await collection.bulkWrite(updates);
        }

        normalized.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        return NextResponse.json({ projects: normalized });
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const incoming = body?.project ?? body;
        const client = await connectToDatabase();
        const db = client.db("yashgoswami");
        const collection = db.collection("website");

        let project = normalizeProject(incoming);
        if (!project.id) {
            project.id = await getNextProjectId(collection);
        }

        const existing = await collection.findOne({ documentType: "project", id: project.id });
        if (existing) {
            return NextResponse.json({ error: "Project ID already exists" }, { status: 409 });
        }

        if (project.featured) {
            await collection.updateMany({ documentType: "project" }, { $set: { featured: false } });
        }

        await collection.insertOne(project);
        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        console.error("Failed to create project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const incoming = body?.project ?? body;
        const projectId = parseId(incoming?.id);

        if (!projectId) {
            return NextResponse.json({ error: "Project id is required" }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db("yashgoswami");
        const collection = db.collection("website");

        const project = normalizeProject(incoming, projectId);

        if (project.featured) {
            await collection.updateMany(
                { documentType: "project", id: { $ne: projectId } },
                { $set: { featured: false } }
            );
        }

        const result = await collection.updateOne(
            { documentType: "project", id: projectId },
            { $set: project }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Failed to update project:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        let id = parseId(searchParams.get("id"));

        if (!id) {
            const body = await request.json().catch(() => null);
            id = parseId(body?.id);
        }

        if (!id) {
            return NextResponse.json({ error: "Project id is required" }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db("yashgoswami");
        const collection = db.collection("website");

        const result = await collection.deleteOne({ documentType: "project", id });
        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted", id });
    } catch (error) {
        console.error("Failed to delete project:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
