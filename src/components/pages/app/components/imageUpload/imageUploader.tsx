import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";

export interface ImageUploaderProps {
    setImage: Function;
    className?: string;
}

export interface ImageUploaderState {
}

class ImageUploader extends React.Component<ImageUploaderProps,
    ImageUploaderState> {
    state = {
        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: ""
    };

    handleChangeUsername = event =>
        this.setState({username: event.target.value});
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = progress => this.setState({progress});
    handleUploadError = error => {
        this.setState({isUploading: false});
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({avatarURL: url});
                this.props.setImage(url);
            });
    };

    uploadText() {
        if (this.state.avatarURL) {
            return (
                <div>
                    Image Uploaded <i className="fas fa-check"/>
                </div>
            );
        } else if (
            this.state.isUploading ||
            (this.state.avatar && !this.state.avatarURL)
        ) {
            return <div>Uploading...</div>;
        } else {
            return (
                <div>
                    Add Image&emsp;
                    <i className="fas fa-plus"/>
                </div>
            );
        }
    }

    render() {
        let backgroundColor = this.state.avatarURL
            ? "bg-green-700 hover:bg-green-800"
            : "bg-blue-700 hover:bg-blue-800";

        return (
            <label
                className={this.props.className||
                    `text-white font-bold py-2 px-4 ml-auto block rounded-full cursor-pointer ${backgroundColor}`}
            >
                {this.uploadText()}
                <FileUploader
                    hidden
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />
            </label>
        );
    }
}

export default ImageUploader;
