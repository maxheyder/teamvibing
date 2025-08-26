'use client';

import Link from "next/link";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import ArcadeGames from "@/components/ArcadeGames";

export default function MaxPortfolio() {
  const [profileImage, setProfileImage] = useState<string>('');

  const handleImageChange = (imageUrl: string) => {
    setProfileImage(imageUrl);
    // Hier könnte später eine API-Call zum Speichern hinzugefügt werden
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-6 py-8">
        {/* Zurück Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Hauptseite
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <ImageUpload
            currentImage={profileImage}
            onImageChange={handleImageChange}
            color="blue"
            size="large"
            className="mb-6"
          />
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Max Portfolio
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Willkommen in Max' innovativem Arbeitsbereich. Hier entstehen technische Lösungen und kreative Projekte.
          </p>
        </div>

        {/* Content Bereich */}
        <div className="max-w-6xl mx-auto">
          <ArcadeGames />
        </div>
      </div>
    </div>
  );
}
