import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as SM from "aws-cdk-lib/aws-secretsmanager";
import * as iam from "aws-cdk-lib/aws-iam";

export class Step38AuroraServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    //  create vpc for the databace instance

    const vpc = new ec2.Vpc(this, "myrdsvpc");

    //  create database cluster

    const myServerlessDB = new rds.ServerlessCluster(this, "ServerlessDB", {
      vpc,
      engine: rds.DatabaseClusterEngine.auroraMysql({
        version: rds.AuroraMysqlEngineVersion.VER_2_04_0,
      }),
      scaling: {
        autoPause: cdk.Duration.minutes(10), // default is to pause after 5 minutes of idle time
        minCapacity: rds.AuroraCapacityUnit.ACU_8, // default is 2 Aurora capacity units (ACUs)
        maxCapacity: rds.AuroraCapacityUnit.ACU_32, // default is 16 Aurora capacity units (ACUs)
      },
      deletionProtection: false,
      defaultDatabaseName: "mysqldb",
    });

// const lambdaLayer = new lambda.LayerVersion(this, "LambdaLayer",{
//   code: lambda.Code.fromAsset(`lambdaLayer`),
// })



    //  for lambda RDS and VPC access
    const role = new iam.Role(this, "LambdaRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonRDSDataFullAccess"),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaVPCAccessExecutionRole"
        ),
      ],
    });

    const secretARN: string = myServerlessDB.secret?.secretArn || "secret-arn";

    //  create a function to access database
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      timeout: cdk.Duration.minutes(1),
      // layers:[lambdaLayer],
      vpc,
      role,
      environment: {
        INSTANCE_CREDENTIALS: `${
          SM.Secret.fromSecretAttributes(this, "sec-arn", { secretCompleteArn: secretARN })
            .secretValue.unsafeUnwrap()
        }`,
      },
    });

    //  create lambda once database is created
    hello.node.addDependency(myServerlessDB);

    //     To control who can access the cluster or instance, use the .connections attribute. RDS databases have a default port: 3306

    myServerlessDB.connections.allowFromAnyIpv4(ec2.Port.tcp(3306));
  }
}