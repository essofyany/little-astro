import { useState } from "react";

function useForm(initialState) {
  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (e) => {
    setInput({
      ...input,
      body: e.target.getContent(),
    });
  };

  return { input, handleChange, handleEditorChange };
}

export default useForm;
