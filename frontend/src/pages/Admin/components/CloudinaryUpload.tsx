import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import api from '../../../services/api';

interface CloudinaryUploadProps {
  label: string;
  onUploadSuccess: (url: string) => void;
  accept?: string;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ 
  label, 
  onUploadSuccess, 
  accept = 'image/*' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        onUploadSuccess(response.data.url);
        setPreview(response.data.url);
      }
    } catch (err) {
      console.error('File upload failure:', err);
      alert('Upload failed. Please ensure backend file pipeline is active.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2 text-left">
      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-4">
        <label className="flex flex-col items-center justify-center w-full max-w-xs h-28 border border-dashed border-zinc-800 hover:border-violet-500/50 bg-zinc-950/80 rounded-xl cursor-pointer transition-colors relative overflow-hidden group">
          {preview ? (
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover opacity-80" />
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <FiUploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-violet-400 transition-colors mb-1.5" />
              <span className="text-[10px] font-mono text-zinc-500">Click to upload file</span>
            </div>
          )}
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          {uploading && (
            <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
