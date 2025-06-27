'use client'
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UploadedVideo from "./components/UploadedVideo";
import { FiUpload, FiLoader } from "react-icons/fi";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getVideos();
      console.log(data)
      setVideos(data as IVideo[]);
    } catch (err: any) {
      setError(err.message || "Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011f4b] to-[#03396c]">
      <div className="container mx-auto px-4 py-7 md:py-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Video Gallery</h1>
            <p className="text-blue-100 opacity-80">
              {videos.length} {videos.length === 1 ? 'video' : 'videos'} available
            </p>
          </div>
          
          <button 
            onClick={() => redirect('/upload')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#53acec] to-[#1e88e5] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FiUpload className="text-lg" />
            <span>Upload Video</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-6 border border-white/10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FiLoader className="animate-spin text-4xl text-blue-300 mb-4" />
              <p className="text-blue-100">Loading videos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-300">
              {error}
              <button 
                onClick={fetchVideos}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors"
              >
                Retry
              </button>
            </div>
          ) : videos.length > 0 ? (
            <UploadedVideo videos={videos} />
          ) : (
            <div className="text-center py-20">
              <div className="text-blue-200 text-5xl mb-4">🎥</div>
              <h3 className="text-xl text-white mb-2">No videos yet</h3>
              <p className="text-blue-100 mb-6">Upload your first video to get started</p>
              <button 
                onClick={() => redirect('/upload')}
                className="px-6 py-2 bg-gradient-to-r from-[#53acec] to-[#1e88e5] text-white rounded-md hover:opacity-90 transition-opacity"
              >
                Upload Video
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}