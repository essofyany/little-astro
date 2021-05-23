import { useQuery, gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    authenticatedItem {
      __typename
    }
  }
`;

export function useUser() {
  const { data } = useQuery(GET_CURRENT_USER);

  return data?.authenticatedItem;
}
