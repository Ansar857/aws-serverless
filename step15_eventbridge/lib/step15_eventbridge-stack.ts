import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as events from "aws-cdk-lib/aws-events"
import * as targets from "aws-cdk-lib/aws-events-targets"
import path = require('path');

export class Step15EventbridgeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const producerfn = new lambda.Function(this , 'Producerlambda' , {
      code : lambda.Code.fromAsset(path.join(__dirname , '../lambda')),
      handler : "producer.handler",
      runtime : lambda.Runtime.NODEJS_16_X
    });

    events.EventBus.grantAllPutEvents(producerfn);



    const consumerfn = new lambda.Function(this , 'consumerfn' , {
      code : lambda.Code.fromAsset(path.join(__dirname , '../lambda')),
      handler : "consumer.handler",
      runtime : lambda.Runtime.NODEJS_16_X
    });

    const neqRule = new events.Rule(this , 'demoClassRule',{
      targets:[new targets.LambdaFunction(consumerfn) ] , 
      description:
      "Filter events that come from country pk and invoke lambda with it." ,
      eventPattern:{
        source: ['demo']
      },
    });
    
  }
}
