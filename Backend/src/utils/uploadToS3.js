import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs'
import { s3Client } from "./s3.js";

export const uploadToS3 = async (filePath, originalName) => {
    const fileStream = fs.createReadStream(filePath)
    const key = `tasks/${Date.now()}-${originalName}`
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Body: fileStream
    })
    const result = await s3Client.send(command)
    if (result.$metadata.httpStatusCode === 200) {
        fs.unlinkSync(filePath)
        const fileUrl =
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        return fileUrl
    }

}