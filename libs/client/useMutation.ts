import { useState } from "react";

// request headers
interface MutationOptions {
  headers?: {
    [key: string]: string;
  }[];
}

// mutator function
type Mutator = (formData: any) => void;

// response data that is updated when the mutator is called.
interface MutationState<T> {
  data: undefined | T;
  loading: boolean;
  error: undefined | any;
}

type UseMutationResponse<T> = [Mutator, MutationState<T>];

export default function useMutation<U = any, T = any>(
  url: string,
  options: MutationOptions = {}
): UseMutationResponse<T> {
  const [state, setState] = useState<MutationState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const mutator = async (formData: U) => {
    setState((prev) => ({ ...prev, loading: true }));
    const headers = options.headers || {};

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      setState((prev) => ({ ...prev, data: json }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: err }));
    }
    setState((prev) => ({ ...prev, loading: false }));
  };
  return [mutator, state];
}
