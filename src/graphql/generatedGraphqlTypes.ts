import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: Decimal; output: Decimal; }
};

export type Category = {
  __typename?: 'Category';
  budget?: Maybe<Scalars['Decimal']['output']>;
  category_color: Scalars['String']['output'];
  category_type: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CategoryColor = {
  __typename?: 'CategoryColor';
  hex_code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type LinkedAccount = {
  __typename?: 'LinkedAccount';
  alias_name?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  item_id: Scalars['String']['output'];
  linked_sub_accounts: Array<LinkedSubAccount>;
  name: Scalars['String']['output'];
};

export type LinkedSubAccount = {
  __typename?: 'LinkedSubAccount';
  account_id: Scalars['String']['output'];
  alias_name?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['Decimal']['output']>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategoryColors: Array<CategoryColor>;
  getLinkedAccounts: Array<LinkedAccount>;
  getTransactions: Array<Transaction>;
};


export type QueryGetCategoriesArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetLinkedAccountsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetTransactionsArgs = {
  userId: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Decimal']['output'];
  category?: Maybe<Category>;
  currency: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  linked_sub_account: LinkedSubAccount;
  name: Scalars['String']['output'];
  pending: Scalars['Boolean']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryColor: ResolverTypeWrapper<CategoryColor>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  LinkedAccount: ResolverTypeWrapper<LinkedAccount>;
  LinkedSubAccount: ResolverTypeWrapper<LinkedSubAccount>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryColor: CategoryColor;
  Decimal: Scalars['Decimal']['output'];
  LinkedAccount: LinkedAccount;
  LinkedSubAccount: LinkedSubAccount;
  Query: {};
  String: Scalars['String']['output'];
  Transaction: Transaction;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  budget?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  category_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryColor'] = ResolversParentTypes['CategoryColor']> = ResolversObject<{
  hex_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type LinkedAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkedAccount'] = ResolversParentTypes['LinkedAccount']> = ResolversObject<{
  alias_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linked_sub_accounts?: Resolver<Array<ResolversTypes['LinkedSubAccount']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkedSubAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkedSubAccount'] = ResolversParentTypes['LinkedSubAccount']> = ResolversObject<{
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alias_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoriesArgs, 'userId'>>;
  getCategoryColors?: Resolver<Array<ResolversTypes['CategoryColor']>, ParentType, ContextType>;
  getLinkedAccounts?: Resolver<Array<ResolversTypes['LinkedAccount']>, ParentType, ContextType, RequireFields<QueryGetLinkedAccountsArgs, 'userId'>>;
  getTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionsArgs, 'userId'>>;
}>;

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linked_sub_account?: Resolver<ResolversTypes['LinkedSubAccount'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  CategoryColor?: CategoryColorResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  LinkedAccount?: LinkedAccountResolvers<ContextType>;
  LinkedSubAccount?: LinkedSubAccountResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
}>;

