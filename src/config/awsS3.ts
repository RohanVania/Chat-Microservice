import AWS from "aws-sdk"

AWS.config.update({
    region:"ca-central-1",
    credentials:{
        accessKeyId:"",
        secretAccessKey:""
    }
})

export const s3=new AWS.S3();





