import ContentLoader from "react-content-loader";

function BlogPageSket(props) {
  return (
    <ContentLoader
      speed={2}
      width={1155}
      height={600}
      viewBox="0 0 1155 600"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="52" cy="100" r="39" />
      <rect x="23" y="152" rx="2" ry="2" width="92" height="10" />
      <rect x="383" y="56" rx="2" ry="2" width="498" height="25" />
      <rect x="294" y="95" rx="10" ry="10" width="700" height="400" />
      <rect x="468" y="549" rx="0" ry="0" width="0" height="1" />
      <rect x="23" y="170" rx="2" ry="2" width="142" height="11" />
      <rect x="292" y="540" rx="2" ry="2" width="406" height="18" />
      <rect x="292" y="511" rx="2" ry="2" width="564" height="18" />
      <rect x="26" y="192" rx="2" ry="2" width="89" height="12" />
    </ContentLoader>
  );
}

export default BlogPageSket;
