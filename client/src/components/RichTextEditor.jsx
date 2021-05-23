import { Editor } from "@tinymce/tinymce-react";

function RichTextEditor({
  handleEditorChange,
  initialValue = "<p>Start writing...</p>",
}) {
  return (
    <Editor
      initialValue={initialValue}
      apiKey="1a65j0uohjw5q3ig6tes22x33ejkacfuqvyzubxhma5fk62d"
      init={{
        height: 230,
        width: 1042,
        menubar: false,
        plugins: [
          "advlist autolink lists link image",
          "charmap print preview anchor help",
          "searchreplace visualblocks code",
          "insertdatetime media table paste wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
      }}
      onChange={handleEditorChange}
    />
  );
}

export default RichTextEditor;
