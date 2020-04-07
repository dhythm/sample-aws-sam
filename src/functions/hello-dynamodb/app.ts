import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  // The endpoint should use `the container name of dynamodb-local`.
  const client = new DynamoDB.DocumentClient({
    endpoint: 'http://dynamodb:8000',
    region: 'ap-north-east1',
  });

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
    return;
  }
};

export { lambdaHandler };
