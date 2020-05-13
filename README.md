Follows with https://qiita.com/navitime_tech/items/70432345d930c2bc1a14
```bash
npm i -D webpack webpack-cli typescript ts-node awesome-typescript-loader aws-sdk glob
npm i -D @types/node @types/webpack @types/aws-lambda @types/glob

touch webpack.config.ts

cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "outDir": "./dist",
    "allowJs": true
  },
  "include": ["./src/**/*"]
}
EOF

npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier
cat <<EOF > .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always"
}
EOF
```

To transpile TS file to JS file.
```bash
npm run watch
# OR
npm run build
```

To build and deploy your application for the first time, run the following in your shell:
```bash
sam build
sam deploy --guided
```

To set up the environment to run on local.
```bash
docker pull amazon/dynamodb-local
docker images
docker network create lambda-local

# Need to run First time, can run `docker start dynamodb` from next time.
docker run --network lambda-local --name dynamodb -d -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb

docker ps --no-trunc
docker stop [CONTAINER_ID]
# OR
docker stop [CONTAINER_NAME]
```

To create a dynamodb table.
```bash
aws dynamodb create-table --generate-cli-skeleton > dynamodb/table.json
# `file://` must be included.
aws dynamodb create-table --cli-input-json file://dynamodb/table.json --endpoint-url http://localhost:8000
aws dynamodb list-tables --endpoint-url http://localhost:8000
aws dynamodb put-item --item file://dynamodb/xxxx.json --endpoint-url http://localhost:8000 --table-name [TABLE_NAME]
aws dynamodb delete-table --endpoint-url http://localhost:8000 --table-name [TABLE_NAME]
```

To use GUI for dynamodb-local.
```bash
npm install dynamodb-admin -g
export DYNAMO_ENDPOINT=http://localhost:8000
dynamodb-admin
```

To run on local
```bash
sam local start-api
# OR
sam local start-api --docker-network lambda-local

sam local invoke "FUNCTION_IDENTIFER"
# OR
sam local invoke --docker-network lambda-local "FUNCTION_IDENTIFER"
```