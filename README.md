# Lambda Gulp

This is a configurable setup for uploading lambda functions to AWS via the aws-sdk.

To start, install dependencies:

```
npm install
```

For this to work, you _must_ run gulp using gulp 4+.

## Lambda

- Crate a config [env].json file like (dev.json).  Then set the NODE_ENV environment variable to the same name as the file when running gulp.

- The file example.json is added as an example for your configs if you had an _example_ environment.

- Add your lambda function in the __lambda__ folder. Then add the function name, filename, apiVersion, and region to the config in your [env].json file.

```json
{
  "lambda" : {
    "file" : "test.js",
    "function" : "test",
    "apiVersion": "2015-03-31",
    "region": "us-east-1"
  }
}
```

- Have a credential file in ~/.aws (~/.aws/credential) with aws keys. Per the [Javascript AWS-SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS)

```
[default]

aws_access_key_id = #

aws_secret_access_key = #
```

## Run Gulp

```bash
export NODE_ENV=dev && node ./node_modules/gulp/bin/gulp.js lambda:deploy
```

## Todo

- Allow to zip folders instead of just files
- Add testing
