#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { step13SecretManagerStack } from '../lib/step13_secret_manager-stack';

const app = new cdk.App();
new step13SecretManagerStack(app, 'Step13SecretManagerStack', {
  });