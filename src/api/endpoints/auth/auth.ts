/**
 * Generated by orval v6.19.0 🍺
 * Do not edit manually.
 * aiba-central-backend
 * AIBA 중앙서버 백엔드입니다.
 * OpenAPI spec version: 0.0.1
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";
import type { TokenDto, TokensResponseDto } from "../../schemas";
import { customAxios } from "../../mutator/customAxios";
import type { ErrorType } from "../../mutator/customAxios";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

/**
 * @summary 로그인
 */
export const authControllerLogin = (
  tokenDto: TokenDto,
  options?: SecondParameter<typeof customAxios>,
) => {
  return customAxios<TokensResponseDto>(
    {
      url: `/auth/login`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: tokenDto,
    },
    options,
  );
};

export const getAuthControllerLoginMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: TokenDto },
    TContext
  >;
  request?: SecondParameter<typeof customAxios>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: TokenDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogin>>,
    { data: TokenDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogin>>
>;
export type AuthControllerLoginMutationBody = TokenDto;
export type AuthControllerLoginMutationError = ErrorType<unknown>;

/**
 * @summary 로그인
 */
export const useAuthControllerLogin = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: TokenDto },
    TContext
  >;
  request?: SecondParameter<typeof customAxios>;
}) => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 토큰 갱신
 */
export const authControllerRefresh = (
  tokenDto: TokenDto,
  options?: SecondParameter<typeof customAxios>,
) => {
  return customAxios<TokensResponseDto>(
    {
      url: `/auth/refresh`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: tokenDto,
    },
    options,
  );
};

export const getAuthControllerRefreshMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRefresh>>,
    TError,
    { data: TokenDto },
    TContext
  >;
  request?: SecondParameter<typeof customAxios>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerRefresh>>,
  TError,
  { data: TokenDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerRefresh>>,
    { data: TokenDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerRefresh(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerRefreshMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerRefresh>>
>;
export type AuthControllerRefreshMutationBody = TokenDto;
export type AuthControllerRefreshMutationError = ErrorType<unknown>;

/**
 * @summary 토큰 갱신
 */
export const useAuthControllerRefresh = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRefresh>>,
    TError,
    { data: TokenDto },
    TContext
  >;
  request?: SecondParameter<typeof customAxios>;
}) => {
  const mutationOptions = getAuthControllerRefreshMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 로그아웃
 */
export const authControllerLogout = (
  tokenDto: TokenDto,
  options?: SecondParameter<typeof customAxios>,
) => {
  return customAxios<string>(
    {
      url: `/auth/logout`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: tokenDto,
    },
    options,
  );
};

export const getAuthControllerLogoutMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogout>>,
    TError,
    { data: TokenDto },
    TContext
  >;
  request?: SecondParameter<typeof customAxios>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogout>>,
  TError,
  { data: TokenDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogout>>,
    { data: TokenDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerLogout(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogout>>
>;
export type AuthControllerLogoutMutationBody = TokenDto;
export type AuthControllerLogoutMutationError = ErrorType<unknown>;

/**
 * @summary 로그아웃
 */
export const useAuthControllerLogout = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogout>>,
    TError,
    { data: TokenDto },
    TContext
  >;
  request?: SecondParameter<typeof customAxios>;
}) => {
  const mutationOptions = getAuthControllerLogoutMutationOptions(options);

  return useMutation(mutationOptions);
};
