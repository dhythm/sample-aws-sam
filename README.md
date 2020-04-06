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

# Running on local
sam local start-api
sam local invoke "FUNCTION_IDENTIFER"
# Deploy to AWS
sam deploy --guided
```