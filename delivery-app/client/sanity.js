import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "aniz8zqq",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-06-02",
});

const builder = imageUrlBuilder(client);

export const urlFor = (src) => builder.image(src);
export default client;
