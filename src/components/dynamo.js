import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export const scanItems = async () => {
  const command = new ScanCommand({ TableName: "Todos" });
  const result = await docClient.send(command);
  return result.Items;
};

export const addItem = async (item) => {
  const command = new PutCommand({
    TableName: "Todos",
    Item: item,
  });
  await docClient.send(command);
};

export const updateItem = async (id, updates) => {
  const command = new UpdateCommand({
    TableName: "Todos",
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

export const deleteItem = async (id) => {
  const command = new DeleteCommand({
    TableName: "Todos",
    Key: { id },
  });
  await docClient.send(command);
};
