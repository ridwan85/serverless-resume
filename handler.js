'use strict';
const AWS = require('aws-sdk');

// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

module.exports = {
  create: async(event, context)=>{
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    }catch(jsonError){
      console.log('There was an error parsing the body', jsonError);
      return {
        statuscode : 400
      }
    }
    if(typeof bodyObj.name === 'undefined' || 
    typeof bodyObj.age === 'undefined'){
      console.log('missing parameters')
      return {
        statusCode :400
      }
    }

    let putParams = {
      TableName : process.env.DYNAMO_DB,
      Item : {
        name : bodyObj.name,
        age : bodyObj.age
      }
    }

    let putResult = {}
    try{
      let dynamodb =  new AWS.DynamoDB.DocumentClient()
      putResult = await dynamodb.put(putParams).promise()
    }catch(putError){
      console.log('There was a problem inserting data');
      console.log('putParams', putParams);
      return {
        statusCode : 500
      }
    }

    return {
      statusCode : 201
    }
  },
  list: async(event, context)=>{

  }
}