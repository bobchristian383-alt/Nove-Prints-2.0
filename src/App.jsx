/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Search, X, Maximize2, ArrowLeft, Github, Twitter, ExternalLink } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(gamesData);

  useEffect(() => {
    const filtered = gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="p-2 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tighter">
              NOVA PRINTS <span className="text-emerald-500">2.0</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8 text-sm font-medium text-white/60">
              <a href="#" className="hover:text-emerald-500 transition-colors">GAMES</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">CATEGORIES</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">NEW</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">ABOUT</a>
            </nav>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4">
              <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={closeGame}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-4">
                   <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={closeGame}
                    className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedGame.title}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-4xl font-display font-bold">{selectedGame.title}</h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {selectedGame.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {['Action', 'Unblocked', 'Web', 'Fast-paced'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-emerald-500" />
                    Quick Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Developer</span>
                      <span>Community</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Platform</span>
                      <span>Web Browser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Rating</span>
                      <span className="text-emerald-500">★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="text-center space-y-6 py-12">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl md:text-8xl font-display font-bold tracking-tighter"
                >
                  PLAY <span className="text-emerald-500 italic">ANYTHING.</span>
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/40 text-xl max-w-2xl mx-auto"
                >
                  The next generation of unblocked gaming. High performance, zero restrictions, curated for the best experience.
                </motion.p>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-xl mx-auto relative group"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search for a game..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-lg"
                  />
                </motion.div>
              </section>

              {/* Games Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleGameSelect(game)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <button className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          PLAY NOW
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold group-hover:text-emerald-500 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-white/40 text-sm line-clamp-1">
                      {game.description}
                    </p>
                  </motion.div>
                ))}
              </section>

              {filteredGames.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-white/20 text-xl">No games found matching your search.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-500 rounded-md">
              <Gamepad2 className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-bold tracking-tighter">NOVA PRINTS 2.0</span>
          </div>
          
          <div className="text-white/20 text-sm">
            © 2026 Nova Prints 2.0. All rights reserved.
          </div>

          <div className="flex gap-8 text-sm font-medium text-white/40">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
