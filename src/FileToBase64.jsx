import React from "react";
import * as R from "ramda";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FileResult = ({ name, content }) => {
  return (
    <div className="file-result">
      <div className="file-name">{name}</div>
      <textarea
        className="file-content"
        defaultValue={content}
        onFocus={e => {
          e.target.select();
        }}
      />
      <CopyToClipboard
        text={content}
        onCopy={(text, result) => {
          if (result) {
            console.log("Copied to clipboard");
          } else {
            console.warn("Failed to copy to clipboard");
          }
        }}
      >
        <Button
          className="copy-button"
          bsStyle="link"
          title="Copy to clipboard"
        >
          <i className="fa fa-clipboard" />
        </Button>
      </CopyToClipboard>
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
          return (
            <div
              {...getRootProps()}
              className={classNames("drag-area", {
                "drag-active": isDragActive,
                "drag-reject": isDragReject
              })}
            >
              {/* <input {...getInputProps()} /> */}
              <h2>File to Base64 Encoder</h2>
              <h4>{isDragAccept ? "Drop" : "Drag"} files here...</h4>
              {isDragReject && <div>Unsupported file type...</div>}
              <div className="file-result-container">
                {files.map(file => (
                  <FileResult
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
