'use strict'

var nconf = require('nconf');
var gulp = require('gulp');
var AWS = require('aws-sdk');
var Promise = require("bluebird");
var path = require('path');
var Zip = require('node-zip');

//instantiate objects
var fsPromisified = new Promise.promisifyAll(require('fs'));
var lambda = new AWS.Lambda(
  {
    apiVersion: nconf.get('lambda:apiVersion'),
    region: nconf.get('lambda:region')
  }
);

function zipLambdaFn(lambdaFn) {
  var zip = new Zip();

  zip.file('index.js', lambdaFn);
  var data = zip.generate({base64:false,compression:'DEFLATE'});

  return fsPromisified
    .writeFileAsync('./converted.zip', data, 'binary')
    .then(function(){
      return fsPromisified.readFileAsync('./converted.zip');
    });
}

function uploadZip(zippedData){
  return new Promise(function(resolve, reject){
    var params = {
      FunctionName: nconf.get('lambda:function'),
      ZipFile: zippedData
    };

    lambda.updateFunctionCode(params, function(err, data){
      if (err) reject(err);
      else     resolve(data);
    });
  });
}

gulp.task('lambda:deploy', function(done){
  if (!nconf.get('lambda')) return done('lambda function name not found. Add it to the [env].json file as a lambda key');

  fsPromisified.readFileAsync('./lambda/' + nconf.get('lambda:file'))
    .then(zipLambdaFn)
    .then(uploadZip)
    .then(function(data){
      console.log('lambda function upload complete');

      done();
    })
    .catch(function(err){
      done(err);
    });
});
