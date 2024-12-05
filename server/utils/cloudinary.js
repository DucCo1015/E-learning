import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config({});

cloudinary.config({
cloud_name : process.env.CLOUD_NAME,
api_key : process.env.CLOUD_API_KEY,
api_secret : process.env.CLOUD_API_SECRET_KEY
});

export const uploadMedia = async (file)  => {
 try {
  const uploadFileRes = await cloudinary.uploader.upload(file, {
   resource_type: "auto",
  })
  return uploadFileRes;
 } catch (error) {
  console.log(error)
 }
}

export const deleteMedialFormCloudinary = async (publicId) => {
 try {
   await cloudinary.uploader.destroy(publicId);
 } catch (error) {
   console.log(error);
 }
};

export const deleteVideoFormCloudinary = async (publicId) => {
   try {
       await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
   } catch (error) {
       console.log(error);
       
   }
}

// export const deleteMedialFormCloudinary = async (publicId) => {
//  try {
//   await cloudinary.uploader.destroy(publicId)
//  } catch (error) {
//   console.log(error)
//  }
// }

// export const deleteVideoFormCloudinary = async (publicId) => {
//  try {
//   await cloudinary.uploader.destroy(publicId,{resource_type: "video"})
//  } catch (error) {
//   console.log(error)
//  }
// }