import 'dotenv/config';
import { cloudinaryImage } from "@keystone-next/cloudinary";
import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const config = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'little-astro/blog-images',
  };

export const BlogImage = list({
    fields: {
        image: cloudinaryImage({
            cloudinary: config,
            label: 'source'
        }),
        blog: relationship({
            ref: 'Blog.image'
        }),
        altText: text()
    }
}) 