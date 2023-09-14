import * as cdk from '@aws-cdk/core';
import { Construct } from 'constructs';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ddb from "@aws-cdk/aws-dynamodb"

export class Step03AppsyncLambdaAsDatasourceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ///APPSYNC API gives you a graphql api with api key
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),       
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,     
          }
        }})

          ///Print Graphql Api Url on console after deploy
    new cdk.CfnOutput(this, "APIGraphQlURL", {
      value: api.graphqlUrl
    })

    ///Print API Key on console after deploy
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

      ///Lambda Fucntion
      const lambda_function = new lambda.Function(this, "LambdaFucntion", {
        runtime: lambda.Runtime.NODEJS_14_X,            ///set nodejs runtime environment
        code: lambda.Code.fromAsset("lambda"),          ///path for lambda function directory
        handler: 'index.handler',                       ///specfic fucntion in specific file
        timeout: cdk.Duration.seconds(10)               ///Time for function to break. limit upto 15 mins
      })


        ////Set lambda as a datasource
    const lambda_data_source = api.addLambdaDataSource("lamdaDataSource", lambda_function);


    ///Describing resolver for datasource
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "hello"
    });

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "mycustommessage"
    });
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "getTodo"
    });
    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo"
    });

    const todosTable = new ddb.Table(this, 'CDKTodosTable', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    todosTable.grantFullAccess(lambda_function)
    lambda_function.addEnvironment('TodoTableName', todosTable.tableName);

  }
}
