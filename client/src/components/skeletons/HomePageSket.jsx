import ContentLoader from "react-content-loader";

function HomePageSket(props) {
  return (
    <ContentLoader
      speed={2}
      width={1337}
      height={500}
      viewBox="0 0 1337 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="10" y="40" rx="10" ry="10" width="665" height="448" />
      <rect x="700" y="40" rx="5" ry="5" width="250" height="40" />
      <rect x="720" y="105" rx="10" ry="10" width="360" height="75" />
      <rect x="720" y="205" rx="10" ry="10" width="360" height="75" />
      <rect x="720" y="305" rx="10" ry="10" width="360" height="75" />
      <rect x="720" y="405" rx="10" ry="10" width="360" height="75" />
    </ContentLoader>
  );
}

export default HomePageSket;
