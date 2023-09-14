import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TodoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-todos-appsync-api',
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
    const lambda_function = new lambda.Function(this, 'lambda', {
       runtime : lambda.Runtime.NODEJS_16_X,
       code : lambda.Code.fromAsset("lambda"),
       handler : "index.handler"
     })

     const lambda_datasource = api.addLambdaDataSource("lambdaresource", lambda_function )

     lambda_datasource.createResolver({
      typeName : "Query",
      fieldName : "welcome"
     })

     lambda_datasource.createResolver({
      typeName : "Mutation",
      fieldName : "addTodo"
     })

     lambda_datasource.createResolver({
      typeName : "Mutation",
      fieldName : "deleteTodo"
     })
     lambda_datasource.createResolver({
      typeName : "Mutation",
      fieldName : "getTodo"
     })
     lambda_datasource.createResolver({
      typeName : "Mutation",
      fieldName : "updateTodo"
     })


     const TodoTable = new ddb.Table(this,'TodoTable',{
      tableName : "TodoTAble",
      partitionKey:{
        name : 'id',
        type : ddb.AttributeType.STRING,  
      }
     });
     TodoTable.grantFullAccess(lambda_function);
     lambda_function.addEnvironment('TODO_TABLE', TodoTable.tableName)
  }
}
