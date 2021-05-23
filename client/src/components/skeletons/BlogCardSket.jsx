import ContentLoader from "react-content-loader";

function BlogCardSket(props) {
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={250}
      viewBox="0 0 340 250"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="15" ry="15" width="335" height="175" />
      <rect x="0" y="185" rx="5" ry="5" width="130" height="20" />
      <rect x="0" y="215" rx="5" ry="5" width="306" height="20" />
    </ContentLoader>
  );
}

export default BlogCardSket;
