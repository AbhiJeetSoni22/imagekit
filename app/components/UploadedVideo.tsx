import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";
import React from "react";

const UploadedVideo = ({ videos }: { videos: IVideo[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {videos.map((video) => (
        <div 
          key={video._id.toString()}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Video Container */}
          <div className="relative pt-[56.25%] bg-black"> {/* 16:9 aspect ratio */}
            <div className="absolute inset-0">
              <Video
                src={video.videoUrl}
                urlEndpoint={video.thumnailUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content Container */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {video.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
              {video.description}
            </p>
            
            {/* Optional: Likes/Comments/Views */}
            <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400 space-x-3">
              <span>1.2K views</span>
              <span>•</span>
              <span>3 days ago</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedVideo;