'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'purple';
}

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  className = '', 
  size = 'large',
  color = 'blue'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24', 
    large: 'w-32 h-32'
  };

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500'
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte wähle eine Bilddatei aus.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Die Datei ist zu groß. Bitte wähle ein Bild unter 5MB.');
      return;
    }

    setIsUploading(true);
    
    // Create a local URL for the image
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full mx-auto cursor-pointer relative overflow-hidden
          transition-all duration-300 hover:scale-105
          ${dragActive ? 'ring-4 ring-blue-300 ring-opacity-50' : ''}
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt="Profilbild"
            fill
            className="object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white">M</span>
          </div>
        )}
        
        {/* Upload Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {isUploading ? (
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-1"></div>
              <span className="text-xs">Lädt...</span>
            </div>
          ) : (
            <div className="text-white text-center">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-xs">Bild ändern</span>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload hint */}
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
        Klicken oder Bild hierher ziehen
      </p>
    </div>
  );
}

