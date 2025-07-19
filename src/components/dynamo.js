import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
 console.log("test", process.env.REACT_APP_AWS_REGION);

const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function createPets(pets) { 
    const command = new PutCommand({
        TableName:"Pets",
        Item: pets,
    });
    await docClient.send(command);
};

export const getPets = async () => {
  const command = new ScanCommand({ TableName: "Pets" });
  const result = await docClient.send(command);
  return result.Items;
};

export const addPet = async (item) => {
  const command = new PutCommand({
    TableName: "Pets",
    Item: item,
  });
  await docClient.send(command);
};

export const updatePet = async (id, updates) => {
  const command = new UpdateCommand({
    TableName: "Pets",
    Key: { id },
    UpdateExpression: "set #t = :t",
    ExpressionAttributeNames: {
      "#t": "task",
    },
    ExpressionAttributeValues: {
      ":t": updates.task,
    },
  });
  await docClient.send(command);
};

export const deletePet = async (id) => {
  const command = new DeleteCommand({
    TableName: "Pets",
    Key: { id },
  });
  await docClient.send(command);
};
