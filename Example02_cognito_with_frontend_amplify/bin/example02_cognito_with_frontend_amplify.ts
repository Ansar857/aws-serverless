
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkBackendStack } from '../lib/example02_cognito_with_frontend_amplify-stack';

const app = new cdk.App();
new CdkBackendStack(app, 'Example02CognitoWithFrontendAmplifyStack', {
});

