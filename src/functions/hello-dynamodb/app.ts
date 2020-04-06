import { APIGatewayEvent, Callback, Context } from 'aws-lambda';

const lambdaHandler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  // const client = new DynamoDB.DocumentClient({
  //   endpoint: 'http://dynamodb:8000',
  //   region: 'ap-north-east1',
  // });

  // client.scan(
  //   {
  //     TableName: process.env.TABLE_NAME,
  //   },
  //   (err, data) => {
  //     if (err) {
  //       console.log({ err });
  //       return;
  //     }
  //     console.log({ data });
  //   },
  // );

  const result = {
    status: 200,
    message: `Hello ${process.env.TABLE_NAME}`,
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
