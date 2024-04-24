import { useEffect } from "react";
import { LoadMoreFn } from "react-relay";
import { useIntersectionObserver } from "./use-intersection-observer";

export function useLoadMore(loadNext: LoadMoreFn<any>, hasNext: boolean) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
  useEffect(() => {
    if (isIntersecting && hasNext) {
      loadNext(10);
    }
  });

  return {
    element: <div ref={ref} />,
  };
}
