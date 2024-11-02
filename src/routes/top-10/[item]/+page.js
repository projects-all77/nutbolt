
    import {createClient} from "@sanity/client";

    const client = createClient({
    projectId: "l7e2dwwy",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false
    });

    export async function load({ params }) {
    const data = await client.fetch(`*[_type == "post"]`);
  
    if (data) {
      return {
        posts: data
      };
    }
    return {
      status: 500,
      body: new Error("Internal Server Error")
    };
  }
