'use client';

import { useState } from 'react';
import SpaceInvaders from './games/SpaceInvaders';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  comingSoon?: boolean;
}

const games: Game[] = [
  {
    id: 'snake',
    title: 'Snake Classic',
    description: 'Das klassische Schlangen-Spiel',
    icon: '🐍',
    color: 'from-green-400 to-green-600',
    difficulty: 'Easy'
  },
  {
    id: 'tetris',
    title: 'Block Puzzle',
    description: 'Stapele die Blöcke geschickt',
    icon: '🧩',
    color: 'from-purple-400 to-purple-600',
    difficulty: 'Medium'
  },
  {
    id: 'pong',
    title: 'Retro Pong',
    description: 'Der Klassiker aus den 70ern',
    icon: '🏓',
    color: 'from-blue-400 to-blue-600',
    difficulty: 'Easy'
  },
  {
    id: 'breakout',
    title: 'Brick Breaker',
    description: 'Zerstöre alle Blöcke',
    icon: '🧱',
    color: 'from-red-400 to-red-600',
    difficulty: 'Medium'
  },
  {
    id: 'memory',
    title: 'Memory Master',
    description: 'Teste dein Gedächtnis',
    icon: '🧠',
    color: 'from-yellow-400 to-yellow-600',
    difficulty: 'Easy'
  },
  {
    id: 'space',
    title: 'Space Invaders',
    description: 'Verteidige die Erde',
    icon: '🚀',
    color: 'from-indigo-400 to-indigo-600',
    difficulty: 'Hard'
  }
];

export default function ArcadeGames() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  const handleGameEnd = (score: number) => {
    setGameScore(score);
    setIsPlaying(false);
    setSelectedGame(null);
  };

  const handleBackToArcade = () => {
    setIsPlaying(false);
    setSelectedGame(null);
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border-4 border-slate-600 shadow-2xl">
      {/* Arcade Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
          <h2 className="text-4xl font-bold font-mono tracking-wider mb-2">
            🕹️ MAX'S ARCADE 🕹️
          </h2>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-red-500 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-cyan-300 font-mono text-lg">
          INSERT COIN TO CONTINUE
        </p>
      </div>

      {/* Game Playing Screen */}
      {isPlaying && selectedGame === 'space' ? (
        <SpaceInvaders 
          onGameEnd={handleGameEnd}
          onBack={handleBackToArcade}
        />
      ) : !selectedGame ? (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-green-400 font-mono text-xl mb-6 animate-pulse">
              SELECT YOUR GAME
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => handleGameSelect(game.id)}
                className="relative bg-slate-700 rounded-xl p-6 border-2 border-slate-500 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                {/* Game Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl mb-4 mx-auto`}>
                  {game.icon}
                </div>

                {/* Game Info */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-2 font-mono">
                    {game.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-3">
                    {game.description}
                  </p>
                  
                  {/* Difficulty Badge */}
                  <div className={`
                    inline-block px-3 py-1 rounded-full text-xs font-bold
                    ${game.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                      game.difficulty === 'Medium' ? 'bg-yellow-500 text-black' :
                      'bg-red-500 text-white'}
                  `}>
                    {game.difficulty}
                  </div>
                </div>



                {/* Retro Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-30"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Arcade Controls */}
          <div className="flex justify-center mt-8">
            <div className="bg-slate-600 rounded-lg p-4 border-2 border-slate-500">
              <div className="flex space-x-4">
                {/* Joystick */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full border-4 border-red-800 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full"></div>
                  </div>
                  <span className="text-white text-xs mt-1 font-mono">MOVE</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-blue-800"></div>
                    <span className="text-white text-xs mt-1 font-mono">A</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full border-4 border-green-800"></div>
                    <span className="text-white text-xs mt-1 font-mono">B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Game Selected Screen */
        <div className="text-center">
          <div className="mb-8">
            {(() => {
              const game = games.find(g => g.id === selectedGame);
              return (
                <div>
                  <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${game?.color} flex items-center justify-center text-4xl mb-4 mx-auto`}>
                    {game?.icon}
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2 font-mono">
                    {game?.title}
                  </h3>
                  <p className="text-slate-300 mb-6">
                    {game?.description}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Start Button */}
          <div className="space-y-4">
                      <button
            onClick={startGame}
            disabled={isPlaying || selectedGame !== 'space'}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl font-mono border-4 border-green-700 hover:from-green-400 hover:to-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedGame === 'space' ? (isPlaying ? 'LOADING...' : 'START GAME') : 'COMING SOON'}
          </button>

            <button
              onClick={() => setSelectedGame(null)}
              className="block mx-auto text-cyan-400 hover:text-cyan-300 font-mono underline"
            >
              ← BACK TO SELECTION
            </button>
          </div>

          {/* Loading Animation */}
          {isPlaying && (
            <div className="mt-8">
              <div className="flex justify-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-green-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-green-400 font-mono mt-4 animate-pulse">
                INITIALIZING GAME ENGINE...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Retro Footer */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <div className="flex justify-between items-center text-slate-400 font-mono text-sm">
          <span>CREDITS: ∞</span>
          <span>LAST SCORE: {gameScore}</span>
          <span>PLAYER: MAX</span>
        </div>
      </div>
    </div>
  );
}
