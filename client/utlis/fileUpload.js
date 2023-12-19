import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const uploadOnAWSS3 = async (file, name) => {
  const client = new S3Client({
    region: `${process.env.NEXT_PUBLIC_AWS_BUCKET_REGION}`,
    credentials: {
      accessKeyId: `${process.env.NEXT_PUBLIC_AWS_ACCESS_KEY}`,
      secretAccessKey: `${process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY}`,
    },
  });

  const command = new PutObjectCommand({
    Bucket: `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}`,
    Body: file,
    Key: `${name}.png`,
    ContentType: "image/png",
  });

  try {
    await client.send(command);
    const uploadUrl = `${process.env.NEXT_PUBLIC_AWS_UPLOAD_URL}/${name}.png`;
    return uploadUrl;
  } catch (err) {
    console.error(err);
  }
};

export default uploadOnAWSS3;
