import Link from "next/link";
import { Heading, Stack } from "@chakra-ui/layout";
import { WiStars } from "react-icons/wi";
import PopularItem from "./PopularItem";

function PopularBlogs({ bestBlogs }) {
  const blogs = bestBlogs.slice(1);
  return (
    <>
      <Heading d="flex" mt="2" mb="3" ml="4" fontSize="2xl" color="freshBlue">
        <WiStars size="35" color="#f7444e" /> Best This Week
      </Heading>
      <Stack ml="10" spacing={1}>
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`}>
            <a>
              <PopularItem
                key={blog.id}
                category={blog.category}
                title={blog.title}
              />
            </a>
          </Link>
        ))}
      </Stack>
    </>
  );
}

export default PopularBlogs;
