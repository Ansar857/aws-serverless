import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as CodePipeline from 'aws-cdk-lib/aws-codepipeline'
import * as CodePipelineAction from 'aws-cdk-lib/aws-codepipeline-actions'
import * as CodeBuild from 'aws-cdk-lib/aws-codebuild'

export class Step14CiCdPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Artifact from source stage
    const sourceOutput = new CodePipeline.Artifact();

    // Artifact from build stage
    const CDKOutput = new CodePipeline.Artifact();

    const stackName = 'CdkBackendStackStack'

    //Code build action, Here you will define a complete build
    const cdkBuild = new CodeBuild.PipelineProject(this, 'CdkBuild', {
      buildSpec: CodeBuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            "runtime-versions": {
              "nodejs": 18
            },
            commands: [
              'npm install'
            ],
          },
          build: {
            commands: [
              'npm run build',
              'npm run cdk synth -- -o dist'
            ],
          },
        },
        artifacts: {
          'base-directory': './dist',      ///outputting our generated JSON CloudFormation files to the dist directory
          files: [
            `${stackName}.template.json`,
          ],
        },
      }),
      environment: {
        buildImage: CodeBuild.LinuxBuildImage.STANDARD_7_0,  ///BuildImage version 3 because we are using nodejs environment 12
      },
    });

    ///Define a pipeline
    const pipline = new CodePipeline.Pipeline(this, 'CDKPipeline', {
      crossAccountKeys: false,  //Pipeline construct creates an AWS Key Management Service (AWS KMS) which cost $1/month. this will save your $1.
      restartExecutionOnUpdate: true,  //Indicates whether to rerun the AWS CodePipeline pipeline after you update it.
    });

    ///Adding stages to pipeline

    //First Stage Source
    pipline.addStage({
      stageName: 'Source',
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: 'Checkout',
          owner: 'Ansar857',
          repo: "cdkBackend",
          oauthToken: cdk.SecretValue.unsafePlainText('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'), ///create token on github and save it on aws secret manager
          output: sourceOutput,                                       ///Output will save in the sourceOutput Artifact
          branch: "main",                                           ///Branch of your repo
        }),
      ], 
    })

    pipline.addStage({
      stageName: 'Build',
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: 'cdkBuild',
          project: cdkBuild,
          input: sourceOutput,
          outputs: [CDKOutput],
        }),
      ],
    })

    pipline.addStage({
      stageName: 'DeployCDK',
      actions: [
        new CodePipelineAction.CloudFormationCreateUpdateStackAction({
          actionName: "AdministerPipeline",
          templatePath: CDKOutput.atPath(`${stackName}.template.json`),   ///Input artifact with the CloudFormation template to deploy
          stackName: stackName,                                           ///Name of stack
          adminPermissions: true  
        }),
      ],
    })



  }
}