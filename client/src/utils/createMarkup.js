import DOMPurify from "isomorphic-dompurify";

export const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};
