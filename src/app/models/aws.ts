import AWS from "aws-sdk";

AWS.config.update({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string
    }
});

export const dynamoDb = new AWS.DynamoDB.DocumentClient();
export const table = process.env.TwilioBusinessDatabase as string;
