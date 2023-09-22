import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
//import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import * as rds from "aws-cdk-lib/aws-rds";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
// import { SubnetType } from "aws-cdk-lib/aws-ec2";
import * as apiGtw from 'aws-cdk-lib/aws-apigateway';

export class RdsPostgressStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a VPC necessary to make a cluster for DB
    const clusterVPC = new Vpc(this, "dbClusterVPC" )

    // create a secret manager to store credential for db and db's credential
    /* Secrets Manager Endpoint */
    clusterVPC.addInterfaceEndpoint("sm", {
      service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    });

    /* RDS Data API Endpoint */
    clusterVPC.addInterfaceEndpoint("rds_data", {
      service: ec2.InterfaceVpcEndpointAwsService.RDS_DATA,
    });

    const dbCluster = new rds.ServerlessCluster(this, "ServerlessDB", {
      vpc: clusterVPC,
      engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
      scaling: {
        autoPause: cdk.Duration.minutes(10), // default is to pause after 5 minutes of idle time
        minCapacity: rds.AuroraCapacityUnit.ACU_8, // default is 2 Aurora capacity units (ACUs)
        maxCapacity: rds.AuroraCapacityUnit.ACU_32, // default is 16 Aurora capacity units (ACUs)
      },
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(this, 'ParameterGroup', 'default.aurora-postgresql13'),
      deletionProtection: false,
      defaultDatabaseName: "rdsPostgresqlDb",
    });

    const lambdaLayer =  new lambda.LayerVersion(this , 'lambda_Layer',{
      code : lambda.Code.fromAsset(`lambda_layer`)
    })
    // Create a lambda act as an api-data-source to make query in db
    const lambdaHandler = new lambda.Function(this, 'myLambdaFunction',{
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handleApiRequest',
      vpc: clusterVPC,
      layers : [lambdaLayer] ,
      environment: {
        'dbClusterArn': dbCluster.clusterArn,
        'secretArn': dbCluster.secret?.secretArn || "secret-arn"

      },
      timeout: cdk.Duration.seconds(30)
    });

    /* grant permissions to access the RDS Data API */
    dbCluster.grantDataApiAccess(lambdaHandler);

    /* create an API */
    const apiDemo = new apiGtw.RestApi(this, 'demoApi');
    
    /* add a resource to the API and a method to the resource */
    const demo = apiDemo.root.addResource('demo');
    demo.addMethod('GET', new apiGtw.LambdaIntegration(lambdaHandler));
    demo.addMethod('POST', new apiGtw.LambdaIntegration(lambdaHandler));
  }
}