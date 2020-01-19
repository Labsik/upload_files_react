import React, { useMemo, useState, useCallback, Component } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";


const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none"
};

const FileUploader = () => {
  const [myFiles, setMyFiles] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles]);
  });
  const maxSize = 1048576;

  const { getRootProps, getInputProps, open, rejectedFiles } = useDropzone({
    onDrop,
    accept: "image/jpg, image/png, video/*, audio/*,   application/*",
    noClick: true,
    noKeyboard: true,
    maxSize
  });

  const style = useMemo(() => ({
    ...baseStyle
  }));

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const files = myFiles.map(file => (
    <li className="mt-1" key={file.name}>
      {file.name
        .split(".")
        .slice(0, -1)
        .join(".")}{" "}
      | {file.name.split(".").pop()} | {file.size} bytes | &nbsp;
      <button className="btn btn-danger" onClick={removeFile(file)}>
        X
      </button>
    </li>
  ));

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const onSubmitFiles = async e => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < myFiles.length; i++) {
      formData.append("file", myFiles[i]);
    }

    try {
      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <i className="fas fa-download"></i>
        <button type="button" className="btn btn-primary mt-2" onClick={open}>
          Upload files
        </button>
        {isFileTooLarge && (
          <h2 className="text-danger mt-2">File is too large!</h2>
        )}
      </div>
      <aside>
        <ol>{files}</ol>

        {files.length > 0 && (
          <button className="btn btn-success mt-2" onClick={onSubmitFiles}>
            Submit
          </button>
        )}
      </aside>
    </div>
  );
};

export default FileUploader;