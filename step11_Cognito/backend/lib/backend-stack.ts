import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from "aws-cdk-lib/aws-cognito"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "userPool-Amplify", {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
      
        email: {
          required: true,
          mutable: true,
        },
        phoneNumber: {
          required:true,
          mutable: true
        }
        
      },
    })

    const userPoolClient = new cognito.UserPoolClient(this, "userPoolClient-Amplify", {
      userPool,
    })

    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    })

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    })
  }
}
