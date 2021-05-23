import ContentLoader from "react-content-loader";

function ProfileSket(props) {
  return (
    <ContentLoader
      speed={2}
      width={1120}
      height={560}
      viewBox="0 0 1120 560"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="475" y="217" rx="3" ry="3" width="232" height="17" />
      <rect x="520" y="244" rx="3" ry="3" width="144" height="10" />
      <rect x="327" y="293" rx="3" ry="3" width="524" height="6" />
      <rect x="328" y="309" rx="3" ry="3" width="484" height="6" />
      <rect x="491" y="326" rx="3" ry="3" width="233" height="6" />
      <circle cx="587" cy="128" r="73" />
      <circle cx="537" cy="399" r="20" />
      <circle cx="604" cy="399" r="20" />
      <circle cx="670" cy="399" r="20" />
    </ContentLoader>
  );
}

export default ProfileSket;
