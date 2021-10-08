import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 * Custom Hook to get user document from back-end
 * @returns {object} returnObject
 * @returns {object | undefined} returnObject.user - user document
 *    ... or undefined if user not logged in
 */
const useUser = () => {
  const { data, error } = useSWR('/api/user/userdoc', fetcher, { revalidateOnMount: true });
  return {
    user: data?.userDoc,
    isLoading: !error && !data,
    isError: error,
  };
};

export {
  useUser,
};
