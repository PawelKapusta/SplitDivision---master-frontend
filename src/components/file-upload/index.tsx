import { ChangeEvent, ReactElement, useState } from "react";

const FileUpload = (): ReactElement => {
    const [file, setFile] = useState<File | null>(null);

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        console.log("Uploaded", setFile);
    };

    return (
        <div>
            <input type="text" onChange={handleFile} />
            <button onClick={handleUpload}>Import</button>
        </div>
    );
};

export default FileUpload;
