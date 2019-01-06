import React from "react";
import * as R from "ramda";
import classNames from "classnames";
import Dropzone from "react-dropzone";

const FileContent = ({ name, content }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{content}</div>
    </div>
  );
};

class FileToBase64 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ files: [] });

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = event => {
        const dataUrl = event.target.result;
        this.onFileLoaded({
          name: file.name,
          content: dataUrl
        });
      };
      reader.readAsDataURL(file);
    });
  };

  onFileLoaded = file => {
    this.setState(prevState => ({
      files: R.append(file, prevState.files)
    }));
  };

  render() {
    const baseStyle = {
      flex: "1 1 0",
      outline: "none",
      padding: 2
    };
    const activeStyle = {
      padding: 0,
      borderWidth: 2,
      borderColor: "#666",
      borderStyle: "dashed",
      borderRadius: 5
    };
    const rejectStyle = {
      padding: 0,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#c66",
      backgroundColor: "#eee"
    };

    const { files } = this.state;

    return (
      <Dropzone onDrop={this.onDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
          acceptedFiles,
          rejectedFiles
        }) => {
          let styles = { ...baseStyle };
          styles = isDragActive ? { ...styles, ...activeStyle } : styles;
          styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

          return (
            <div {...getRootProps()} style={styles}>
              {/* <input {...getInputProps()} /> */}
              <div>{isDragAccept ? "Drop" : "Drag"} files here...</div>
              {isDragReject && <div>Unsupported file type...</div>}
              <div>
                {files.map(file => (
                  <FileContent
                    key={file.name}
                    name={file.name}
                    content={file.content}
                  />
                ))}
              </div>
            </div>
          );
        }}
      </Dropzone>
    );
  }
}

export default FileToBase64;
