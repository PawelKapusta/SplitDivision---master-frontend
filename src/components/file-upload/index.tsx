import React, { useState, ChangeEvent, ReactElement } from "react";

const FileUpload = (): ReactElement => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        console.log("Uploaded", selectedFile);
    };

    return (
        <div style={{ width: "100px", marginTop: "20px" }}>
            <input type="text" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
