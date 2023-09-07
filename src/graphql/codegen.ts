import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schema.ts',
  generates: {
    'src/graphql/generatedGraphqlTypes.ts': {
      config: {
        useIndexSignature: true,
        scalars: {
          Decimal: 'Decimal',
        },
      },
      plugins: [
        {
          add: {
            // eslint-disable-next-line quotes
            content: "import { Decimal } from '@prisma/client/runtime/library';",
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
};

export default config;
