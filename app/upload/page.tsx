"use client";
import { apiClient } from "@/lib/api-client";

import {  useRouter } from "next/navigation";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { Upload, Video, Image, Loader2 } from "lucide-react";


const VideoUploadForm = ({}) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumnailUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      setError("");
       await apiClient.createVideo(formData);
      router.push('/');
    } catch (error) {
      console.error("Failed to upload video:", error);
      setError(error.message || "Failed to upload video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011f4b] to-[#03396c] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Upload className="w-6 h-6" />
            Upload New Video
          </h2>
          <p className="text-blue-100 mt-1">Share your content with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center text-red-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800"
              placeholder="Enter an engaging title for your video"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800"
              placeholder="Tell viewers about your video content"
            />
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Video File <span className="text-red-500">*</span>
            </label>
            <div className={`border-2 ${formData.videoUrl ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-lg p-4 transition-all`}>
              <FileUpload
                fileType="video"
                onSuccess={(res) => {
                  setFormData(prev => ({ ...prev, videoUrl: res.url }));
                  setVideoUploading(false);
                }}
              />
              {videoUploading && (
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Uploading video...
                </div>
              )}
              {formData.videoUrl && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <Video className="w-4 h-4 mr-2" />
                  Video uploaded successfully
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail Image <span className="text-red-500">*</span>
            </label>
            <div className={`border-2 ${formData.thumnailUrl ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-lg p-4 transition-all`}>
              <FileUpload
                fileType="image"
                onSuccess={(res) => {
                  setFormData(prev => ({ ...prev, thumnailUrl: res.url }));
                  setThumbnailUploading(false);
                }}
              />
              {thumbnailUploading && (
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Uploading thumbnail...
                </div>
              )}
              {formData.thumnailUrl && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <Image className="w-4 h-4 mr-2" />
                  Thumbnail uploaded successfully
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !formData.videoUrl || !formData.thumnailUrl}
              className={`px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${
                isUploading || !formData.videoUrl || !formData.thumnailUrl ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isUploading ? "Publishing..." : "Publish Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadForm;