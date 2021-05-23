import 'dotenv/config';
import { list } from "@keystone-next/keystone/schema";
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'little-astro/user-photos',
  };
export const UserPhoto = list({
    fields: {
        photo: cloudinaryImage({
            cloudinary,
            label: 'source'
        }),
        user: relationship({
            ref: 'User.photo'
        }),
        altText: text()
    }
})