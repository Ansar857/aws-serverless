import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk" 



const DocClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'api_table'
type item ={
    id: string;
    name : string}

  
exports.handleApiRequest = async (event: APIGatewayProxyEvent) => {

  if (event.httpMethod == "GET") {
    const result = await DocClient.scan({TableName:tableName}).promise();
    console.log(event.httpMethod);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "command completed successfully",
          result: result,
          event: event,
        }),
    }


  }
  else if (event.httpMethod == "POST") {
    const Id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;  // Generate a unique ID for the item
    
    const item: item = { id:Id, name:event.body || "" };

    const params = {
      TableName: tableName,
      Item: item
    };
    const result = await DocClient.put(params).promise()


        return {
        statusCode: 200,
        body: JSON.stringify({
          message: "command completed successfully",
          result : result,
          event: event,
        }),
      };
  }
 return {
    message: "HTTP method not found"
 }

};