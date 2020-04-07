import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const client = new DynamoDB.DocumentClient({
    endpoint: 'http://localhost:8000',
    region: 'ap-north-east1',
  });

  const data = await client
    .scan(
      {
        TableName: process.env.TABLE_NAME,
      },
      // (err, data) => {
      //   if (err) {
      //     console.log({ err });
      //     return;
      //   }
      //   console.log({ data });
      // },
    )
    .promise();
  console.log({ data });

  const result = {
    status: 200,
    message: `Hello ${process.env.TABLE_NAME}`,
    hoge: data,
  };

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(result),
  });
};

export { lambdaHandler };
