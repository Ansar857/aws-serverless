import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as ses from "aws-cdk-lib/aws-ses"
import * as actions from "aws-cdk-lib/aws-ses-actions"
import * as s3 from "aws-cdk-lib/aws-s3"

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InvokeLambdaOnReceiveingMailStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket =  new s3.Bucket(this , "Bucket");

    const actionLambda = new lambda.Function(this , 'SES_ACTION_LAMBDA',{
      code : lambda.Code.fromAsset('lambda'),
      runtime : lambda.Runtime.NODEJS_16_X,
      handler : 'index.handler',
    });

    const ruleSet = new ses.ReceiptRuleSet(this , 'ruleSet',{
      receiptRuleSetName: 'calling-lambda-rule-set',
    });

    ruleSet.addRule('INVOKE_LAMBDA_RULE',{
      recipients: ["selleracc26@gmail.com"],
      actions: [
        new actions.S3({
          bucket,
          objectKeyPrefix : 'emails/'
        })
      ],
      scanEnabled: true, // Enable spam and virus scanning
    })

  }
}
