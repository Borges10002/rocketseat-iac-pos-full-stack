import * as aws from "@pulumi/aws";

const importedBucket = new aws.s3.Bucket("borges-rockeseat", {
    bucket: "borges-rockeseat",
    tags: {
        IAC: "true",
    },
});

const primeiroBucket = new aws.s3.Bucket("meu-bucket-primeiro", {
    bucket: "meu-bucket-novo-2026-diego-primeiro",
    tags: {
        IAC: "true",''
    },
});

const segundoBucket = new aws.s3.Bucket("meu-bucket-segundo", {
    bucket: "meu-bucket-novo-2026-diego-segundo",
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

export const primeiroBucketName = primeiroBucket.id;
export const primeiroBucketRegion = primeiroBucket.region;
export const primeiroBucketArn = primeiroBucket.arn;

export const segundoBucketName = segundoBucket.id;
export const segundoBucketRegion = segundoBucket.region;
export const segundoBucketArn = segundoBucket.arn;

export const importedBucketName = importedBucket.id;

export const ecrName = ecr.name;
export const ecrRepositoryUrl = ecr.repositoryUrl;
