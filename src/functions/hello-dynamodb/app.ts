import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  // The endpoint should use `the container name of dynamodb-local`.
  const client = new DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
    ...(process.env.AWS_SAM_LOCAL === 'true' && {
      endpoint: 'http://dynamodb:8000',
    }),
  });

  //
  // callback(null, {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //   },
  //   body: JSON.stringify({
  //     status: 200,
  //     message: `Hello ${process.env.TABLE_NAME}`,
  //   }),
  // });
  // return;
  try {
    const data = await client
      .scan({
        TableName: process.env.TABLE_NAME,
      })
      .promise();

    const result = {
      status: 200,
      message: `Hello ${process.env.TABLE_NAME}`,
      data,
    };

    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(result),
    });
  } catch (err) {
    console.log(err);
  }
};

export { lambdaHandler };
