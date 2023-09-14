import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs/lib/construct';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from "aws-cdk-lib/aws-iam"

export class step13SecretManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // const role = new iam.Role(this, 'LambdaRole', {
    //   assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    // });



    const secret = new secretsmanager.Secret(this, 'Secret' , {
      generateSecretString:{
        secretStringTemplate : JSON.stringify({username : 'Ansar' , password : "12345"}),
        generateStringKey : 'randomKey', 
      }
    });  // SecretsManager generate a new secret value automatically

    // fromSecretAttributes(this , 'Secret' , {
      //     secretPartialArn : secret.secretArn,
      // })
      const secretValue = secretsmanager.Secret.fromSecretNameV2(this,'SecretValue',secret.secretName)
      
      const lambdaFn = new lambda.Function(this, `ExampleLambdaAssetFn`, {
        code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { console.log("SECRET_KEY", process.env.EXAMPLE_SECRET_KEY); return cb(null, "hi"); }'),
        runtime: lambda.Runtime.NODEJS_16_X,
        //  role: role,
        environment: {
          EXAMPLE_SECRET_KEY: secretValue.secretValue.unsafeUnwrap().toString(),
      },
      handler: "index.handler",
    })

  }
}