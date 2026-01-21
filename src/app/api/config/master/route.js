export async function GET(request) {
    const data = {
        message: "Hello from config master",
        demo: {
            id: 1,
            name: "Demo"
        }
    };
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
