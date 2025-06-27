"use client";

import { upload, UploadResponse } from "@imagekit/next";
import { useState } from "react";
import { UploadCloud, Loader2, CheckCircle, XCircle } from "lucide-react";


interface FileUploadProps {
  onSuccess: (res:UploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
  className?: string;
}

const FileUpload = ({ onSuccess, onProgress, fileType, className }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video")) {
        setError("Please upload a valid video file (MP4, WebM, MOV)");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100MB");
        return false;
      }
    } else if (fileType === "image") {
      if (!file.type.startsWith("image")) {
        setError("Please upload a valid image file (JPG, PNG, GIF)");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return false;
      }
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setFileName(file.name);
    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      const { expire, token, signature } = auth.authenticationParameters;

      const res = await upload({
        file,
        fileName: file.name,
        expire,
        token,
        signature,
        publicKey: auth.publicKey,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
            if (onProgress) onProgress(percent);
          }
        },
      });

      onSuccess(res);
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          {uploading ? (
            <Loader2 className="w-8 h-8 mb-2 text-blue-500 animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
          )}
          <p className="text-sm text-gray-600">
            {uploading ? (
              <span className="font-medium text-blue-600">Uploading {fileName}</span>
            ) : (
              <>
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {fileType === "video" ? "MP4, WebM or MOV (Max. 100MB)" : "JPG, PNG or GIF (Max. 10MB)"}
          </p>
        </div>
        <input 
          type="file" 
          accept={fileType === "video" ? "video/*" : "image/*"} 
          onChange={handleFileChange}
          className="hidden" 
          disabled={uploading}
        />
      </label>

      {uploading && (
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>{fileName}</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm p-2 bg-red-50 rounded">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!uploading && fileName && !error && (
        <div className="flex items-center gap-2 text-green-600 text-sm p-2 bg-green-50 rounded">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{fileName} ready</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;