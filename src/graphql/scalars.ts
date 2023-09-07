import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLScalarType, Kind } from 'graphql';

export const DecimalScalar = new GraphQLScalarType({
  name: 'Decimal',
  description: 'An arbitrary-precision Decimal type',
  /**
   * Value sent to the client
   */
  serialize(value) {
    return String(value);
  },
  /**
   * Value from the client
   */
  parseValue(value) {
    return new Decimal(value as Decimal.Value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
      return new Decimal(ast.value);
    }
    return null;
  },
});
