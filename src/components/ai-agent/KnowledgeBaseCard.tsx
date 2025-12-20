import React from "react";

interface KnowledgeFile {
  id: string;
  name: string;
  type: "interview" | "lyrics" | "document";
  size: string;
  uploadedAt: string;
}

interface KnowledgeBaseCardProps {
  files?: KnowledgeFile[];
  totalFiles?: number;
}

const fileTypeIcons: Record<string, { icon: string; color: string }> = {
  interview: { icon: "fa-solid fa-file-lines", color: "text-orange-400" },
  lyrics: { icon: "fa-solid fa-music", color: "text-blue-400" },
  document: { icon: "fa-solid fa-file-alt", color: "text-gray-400" },
};

export function KnowledgeBaseCard({
  files = [
    {
      id: "1",
      name: "Rolling Stone Interview 2023",
      type: "interview",
      size: "1.2MB",
      uploadedAt: "Uploaded yesterday",
    },
    {
      id: "2",
      name: "New Album Lyrics",
      type: "lyrics",
      size: "450 KB",
      uploadedAt: "Uploaded 2 days ago",
    },
  ],
  totalFiles = 14,
}: KnowledgeBaseCardProps) {
  return (
    <section className="bg-brand-gray-400/50 rounded-2xl p-6 border border-white/10">
      <h2 className="text-lg font-bold text-white flex items-center space-x-3 mb-4">
        <i className="fa-solid fa-book text-purple-400"></i>
        <span>Knowledge Base</span>
      </h2>
      <div className="border-2 border-dashed border-brand-gray-200 rounded-xl p-8 text-center bg-brand-gray-500/30 cursor-pointer hover:border-purple-600/50 transition-colors">
        <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-arrow-up-from-bracket text-purple-400 text-xl"></i>
        </div>
        <h3 className="font-semibold text-white">
          Click to upload or drag and drop
        </h3>
        <p className="text-sm text-gray-400 mt-1">PDF, TXT, MP3 (Max 50MB)</p>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 uppercase font-medium tracking-wider px-4 mb-2">
          <span>File Name</span>
          <span>Type</span>
          <span className="text-right">Action</span>
        </div>
        <ul className="space-y-2">
          {files.map((file) => {
            const typeConfig = fileTypeIcons[file.type] || fileTypeIcons.document;
            return (
              <li
                key={file.id}
                className="flex items-center justify-between p-4 rounded-lg bg-brand-gray-300/50 hover:bg-brand-gray-300/80 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <i className={`${typeConfig.icon} ${typeConfig.color} text-lg`}></i>
                  <div>
                    <p className="font-medium text-white">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {file.size} - {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded-md font-medium capitalize">
                  {file.type}
                </span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text-center mt-4">
        <button className="text-sm font-semibold text-purple-400 hover:text-white transition-colors">
          View all {totalFiles} files
        </button>
      </div>
    </section>
  );
}
