import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ddb from "aws-cdk-lib/aws-dynamodb"

export class CdkBackendStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamodbTable = new ddb.Table(this , "Table" ,{
      partitionKey :{
        name: 'id',
        type: ddb.AttributeType.STRING
      },
    });

    const dynamodbTable2 = new ddb.Table(this , "Table2" ,{
      partitionKey :{
        name: 'id',
        type: ddb.AttributeType.STRING
      },
    });
  }
}
