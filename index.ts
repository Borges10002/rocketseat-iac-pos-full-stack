import * as aws from "@pulumi/aws";

const importedBucket = new aws.s3.Bucket("borges-rockeseat", {
    bucket: "borges-rockeseat",
    tags: {
        IAC: "true",
    },
});

const bucket = new aws.s3.Bucket("meu-bucket-novo", {
    bucket: "meu-bucket-novo-2026-diego",
    tags: {
        IAC: "true",
    },
});

const ecr = new aws.ecr.Repository("segundo-teste-pos-rocketseat", {
    name: "segundo-teste-pos-rocketseat",
    imageTagMutability: "IMMUTABLE",
    tags: {
        IAC: "true",
    },
});

export const bucketName = bucket.id;
export const bucketRegion = bucket.region;
export const bucketArn = bucket.arn;
export const importedBucketName = importedBucket.id;

export const ecrName = ecr.name;
export const ecrRepositoryUrl = ecr.repositoryUrl;
