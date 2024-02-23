import AWS from "aws-sdk"

AWS.config.update({
    region:"ca-central-1",
    credentials:{
        accessKeyId:"AKIARECL5FISMIGQC4JC",
        secretAccessKey:"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"
    }
})

export const s3=new AWS.S3();





