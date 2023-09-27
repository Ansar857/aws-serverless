import * as cdk from 'aws-cdk-lib';
import * as lambda  from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as apiGtw from "aws-cdk-lib/aws-apigateway"
import * as ddb from "aws-cdk-lib/aws-dynamodb"

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const db_lambda = new lambda.Function(this , 'db_lambda',{
      code : lambda.Code.fromAsset('lambda'),
      runtime : lambda.Runtime.NODEJS_18_X,
      handler :'index.handleApiRequest'
    })

    /* create an API */
    const apiDemo = new apiGtw.RestApi(this, 'demoApi');
    
    /* add a resource to the API and a method to the resource */
    const demo = apiDemo.root.addResource('demo');
    demo.addMethod('GET', new apiGtw.LambdaIntegration(db_lambda));
    demo.addMethod('POST', new apiGtw.LambdaIntegration(db_lambda));


    const ApiTable = new ddb.Table(this, 'apiTable', {
      tableName : "api_table",
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    // enable the Lambda function to access the DynamoDB table (using IAM)
    ApiTable.grantFullAccess(db_lambda);
    db_lambda.addEnvironment('TABLE_NAME' , ApiTable.tableName);
  }
}
