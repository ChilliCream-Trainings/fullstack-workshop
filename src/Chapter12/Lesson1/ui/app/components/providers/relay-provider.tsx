import { meros } from "meros/browser";
import { useState } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import {
  Environment,
  FetchFunction,
  SubscribeFunction,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";

import { createClient as createClientSSE } from "graphql-sse";
import { createClient as createClientWS } from "graphql-ws";
import { isAsyncIterable } from "@/app/shared/utils";

const HEADER_ACCEPT = "Accept";
const HEADER_CONTENT_TYPE = "Content-Type";
const HEADER_CSRF = "X-CSRF";

const fetchFn: FetchFunction = (
  operation,
  variables,
  _cacheConfig,
  _uploadables
) => {
  return Observable.create((sink) => {
    const init = {
      method: "POST",
      headers: {
        [HEADER_ACCEPT]: "application/json",
        [HEADER_CONTENT_TYPE]: "application/json",
        [HEADER_CSRF]: "1",
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    };

    (async () => {
      try {
        const response = await fetch("/graphql", init);

        const parts = await meros<any>(response);

        if (isAsyncIterable(parts)) {
          for await (const part of parts) {
            if (!part.json) {
              sink.error(new Error("Failed to parse part as json."));
              break;
            }

            sink.next(part.body);
          }
        } else {
          sink.next(await parts.json());
        }

        sink.complete();
      } catch (error) {
        sink.error(error as Error);
      }
    })();
  });
};

/**
 * With `graphql-sse`.
 * @see https://github.com/enisdenjo/graphql-sse
 */
const subscribeFnWithSSE: SubscribeFunction = (operation, variables) => {
  const client = createClientSSE({
    url: "/graphql",

    /** If you have an HTTP/2 server, it is recommended to use the client in "distinct connections mode" (singleConnection = false) which will create a new SSE connection for each subscribe. */
    singleConnection: false,

    headers: {
      [HEADER_ACCEPT]: "application/json",
      [HEADER_CONTENT_TYPE]: "application/json",
      [HEADER_CSRF]: "1",
    },
  });

  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error("Operation text cannot be empty"));
    }
    client.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink as any
    );
  });
};

const subscribeFn = subscribeFnWithSSE;

function createEnvironment(): Environment {
  const source = new RecordSource();

  /**
   * Presence of Data
   * @see https://relay.dev/docs/guided-tour/reusing-cached-data/presence-of-data/
   *
   * - Note that having a buffer size of 0 is equivalent to not having the release buffer, which means that queries will be immediately released and collected.
   * - By default, environments have a release buffer size of 10.
   *
   * @example
   * // last 10 queries
   * gcReleaseBufferSize: 10,
   *
   *
   * Staleness of Data
   * @see https://relay.dev/docs/guided-tour/reusing-cached-data/staleness-of-data/
   *
   * - If the query cache expiration time is not provided, staleness checks only look at whether the referenced records have been invalidated.
   *
   * @example
   * // 1 min
   * queryCacheExpirationTime: 60 * 1_000,
   */
  const options = {};

  const store = new Store(source, options);

  const network = Network.create(fetchFn, subscribeFn);

  return new Environment({
    network,
    store,
  });
}

export interface RelayProviderProps {
  children: React.ReactNode;
}

export const environment = createEnvironment();

export function RelayProvider(props: RelayProviderProps) {
  return <RelayEnvironmentProvider environment={environment} {...props} />;
}
