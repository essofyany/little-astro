import gql from "graphql-tag";

export const CREATE_BLOG = gql`
  mutation CREATE_BLOG(
    $title: String!
    $imageUrl: String
    $body: String!
    $category: String!
    $authorId: ID!
  ) {
    createBlog(
      data: {
        title: $title
        imageUrl: $imageUrl
        body: $body
        category: $category
        #TODO: make is flexible
        author: { connect: { id: $authorId } }
      }
    ) {
      id
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DELETE_BLOG($id: ID!) {
    deleteBlog(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UPDATE_BLOG(
    $blogId: ID!
    $title: String!
    $imageUrl: String
    $body: String!
    $category: String!
    $authorId: ID!
  ) {
    updateBlog(
      id: $blogId
      data: {
        title: $title
        imageUrl: $imageUrl
        body: $body
        category: $category
        #TODO: make is flexible
        author: { connect: { id: $authorId } }
      }
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $id: ID!
    $fullname: String
    $photoUrl: String
    $status: String
    $city: String
    $country: String
    $githubLink: String
    $tiwtterLink: String
    $linkedinLink: String
  ) {
    updateUser(
      id: $id
      data: {
        fullname: $fullname
        photoUrl: $photoUrl
        status: $status
        city: $city
        country: $country
        githubLink: $githubLink
        tiwtterLink: $tiwtterLink
        linkedinLink: $linkedinLink
      }
    ) {
      id
      photoUrl
      fullname
      status
      city
      country
      githubLink
      tiwtterLink
      linkedinLink
    }
  }
`;

// interaction : like and bookmark a blog

export const SAVE_A_BLOG = gql`
  mutation SAVE_A_BLOG($userId: ID!, $blogId: ID!) {
    updateBlog(id: $blogId, data: { bookmarks: { connect: { id: $userId } } }) {
      title
      bookmarks {
        fullname
      }
    }
  }
`;

export const UNSAVE_A_BLOG = gql`
  mutation UNSAVE_A_BLOG($userId: ID!, $blogId: ID!) {
    updateBlog(
      id: $blogId
      data: { bookmarks: { disconnect: { id: $userId } } }
    ) {
      title
      bookmarks {
        fullname
      }
    }
  }
`;

export const DISLIKE_A_BLOG = gql`
  mutation DISLIKE_A_BLOG($userId: ID!, $blogId: ID!) {
    updateBlog(id: $blogId, data: { stars: { disconnect: { id: $userId } } }) {
      title
      stars {
        fullname
      }
    }
  }
`;

export const LIKE_A_BLOG = gql`
  mutation LIKE_A_BLOG($userId: ID!, $blogId: ID!) {
    updateBlog(id: $blogId, data: { stars: { connect: { id: $userId } } }) {
      title
      stars {
        fullname
      }
    }
  }
`;

// Follow / Unfollow
export const FOLLOW_USER = gql`
  mutation FOLLOW_USER($userToFollowId: ID!, $currentUserId: ID!) {
    updateUser(
      id: $userToFollowId
      data: { followers: { connect: { id: $currentUserId } } }
    ) {
      id
      fullname
      follows {
        fullname
      }
      followers {
        fullname
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UNFOLLOW_USER($userToUnFollowId: ID!, $currentUserId: ID!) {
    updateUser(
      id: $userToUnFollowId
      data: { followers: { disconnect: { id: $currentUserId } } }
    ) {
      id
      fullname
      follows {
        fullname
      }
      followers {
        fullname
      }
    }
  }
`;
