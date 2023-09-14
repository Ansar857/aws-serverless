import * as cdk from '@aws-cdk/core';
import { Construct } from 'constructs';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';


export class Step04AppsyncLambdaDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const api = new appsync.GraphqlApi(this, 'myDBApi', {
      name: 'cdk-appsync-dynamodb-api',
      schema: appsync.Schema.fromAsset('schema/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      },
    });


    const lambda_function = new lambda.Function(this , "DynamoDbLambda" , {
      runtime : lambda.Runtime.NODEJS_14_X,
      code : lambda.Code.fromAsset("lambda"),
      handler : "index.handler"
    });

    const lambda_datasource = api.addLambdaDataSource("LambdaDatasource" , lambda_function);

    lambda_datasource.createResolver({
      typeName : "Query",
      fieldName : "welcome"
    })

    lambda_datasource.createResolver({
      typeName : "Mutation",
      fieldName : "addProduct"
    })
    lambda_datasource.createResolver({
      typeName : "Mutation",
      fieldName : "deleteProduct"
    })
    // lib/appsync-cdk-app-stack.ts
    const ProductTable = new ddb.Table(this, 'ProductTable', {
      tableName : "Products",
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    // enable the Lambda function to access the DynamoDB table (using IAM)
    ProductTable.grantFullAccess(lambda_function);
    lambda_function.addEnvironment('TABLE_NAME' , ProductTable.tableName);


  }
}
