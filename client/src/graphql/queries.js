import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER($userId: ID!) {
    User(where: { id: $userId }) {
      id
      fullname
      photoUrl
      city
      country
      githubLink
      tiwtterLink
      linkedinLink
      photo {
        photo {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GET_USER_PROFILE($userId: ID!, $first: Int, $skip: Int) {
    User(where: { id: $userId }) {
      id
      fullname
      status
      photoUrl
      city
      country
      githubLink
      tiwtterLink
      linkedinLink
      followers {
        id
      }
      follows {
        id
      }
      photo {
        photo {
          publicUrlTransformed
        }
      }
      blogs(sortBy: createdAt_DESC, first: $first, skip: $skip) {
        id
        title
        category
        imageUrl
        image {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export const FETCH_BLOGS = gql`
  query FETCH_BLOGS($skip: Int, $first: Int) {
    allBlogs(first: $first, skip: $skip, sortBy: createdAt_DESC) {
      createdAt
      id
      title
      category
      imageUrl
      image {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const FETCH_SINGLE_BLOG = gql`
  query FETCH_SINGLE_BLOG($id: ID!) {
    Blog(where: { id: $id }) {
      id
      title
      category
      imageUrl
      createdAt
      body
      image {
        image {
          publicUrlTransformed
        }
        altText
      }
      author {
        id
        fullname
        photoUrl
        photo {
          photo {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export const BLOGS_OF_CATEGORY = gql`
  query BLOGS_OF_CATEGORY($category: String!) {
    allBlogs(where: { category: $category }) {
      id
      title
      imageUrl
      image {
        image {
          publicUrlTransformed
        }
      }
      category
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES {
    allBlogs {
      category
    }
  }
`;

export const GET_USER_FOLLOWS = gql`
  query GET_USER_FOLLOWS($currentUserId: ID!, $userId: [ID]!) {
    User(where: { id: $currentUserId }) {
      id
      fullname
      follows(where: { id_in: $userId }) {
        id
        fullname
      }
    }
  }
`;

export const RELATED_BLOGS = gql`
  query RELATED_BLOGS($category: String!, $title: String!) {
    allBlogs(where: { category: $category, title_not: $title }, first: 6) {
      id
      title
      category
      imageUrl
      image {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// interactions

export const IS_LIKED_BY_USER = gql`
  query IS_LIKED_BY_USER($blogId: ID!, $currentUserId: ID!) {
    Blog(where: { id: $blogId }) {
      stars(where: { id: $currentUserId }) {
        fullname
      }
    }
  }
`;

export const IS_SAVED_BY_USER = gql`
  query IS_SAVED_BY_USER($blogId: ID!, $currentUserId: ID!) {
    Blog(where: { id: $blogId }) {
      bookmarks(where: { id: $currentUserId }) {
        fullname
      }
    }
  }
`;

export const SEARCH_BLOGS = gql`
  query SERACH_BLOGS($searchTerm: String!) {
    allBlogs(
      first: 5
      where: {
        OR: [
          { title_contains_i: $searchTerm }
          { body_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      title
    }
  }
`;

export const ALL_USER_BLOGS_COUNT = gql`
  query ALL_USER_BLOGS_COUNT($userId: ID!) {
    _allBlogsMeta(where: { author: { id: $userId } }) {
      count
    }
  }
`;
