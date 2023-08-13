import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schema.ts',
  generates: {
    'src/graphql/generatedGraphqlTypes.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
