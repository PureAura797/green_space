'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const STORIES = [
  { id: '01', title: 'Обработка участка 15 соток', image: '/images/videos/01_ticks.png', video: '/videos/demo.mp4' },
  { id: '02', title: 'Уничтожение борщевика', image: '/images/videos/02_hogweed.png', video: '/videos/demo.mp4' },
  { id: '03', title: 'Ловушки для кротов', image: '/images/videos/03_moles.png', video: '/videos/demo.mp4' },
  { id: '04', title: 'Лечение многовекового дуба', image: '/images/videos/04_oak.png', video: '/videos/demo.mp4' },
  { id: '05', title: 'Спил аварийной сосны', image: '/images/videos/05_pine.png', video: '/videos/demo.mp4' },
];

export default function VideoStories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<typeof STORIES[0] | null>(null);

  // Lock body scroll when video is playing
  useEffect(() => {
    if (playingVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [playingVideo]);

  // For native smooth horizontal scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Calculate active index based on scroll position
    const itemWidth = scrollWidth / STORIES.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < STORIES.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="results" className="relative py-16 md:py-24 lg:py-32 border-b border-border overflow-hidden bg-background" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
          Видео-отчёты
        </h2>
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-sm tracking-widest text-foreground/50">
            [ {String(activeIndex + 1).padStart(2, '0')} / {String(STORIES.length).padStart(2, '0')} ]
          </div>
          <div className="w-32 h-[1px] bg-border relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / STORIES.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 md:pl-8 pr-[50vw] gap-8"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {STORIES.map((story, index) => (
          <motion.div
            key={story.id}
            className="shrink-0 w-[80vw] md:w-[400px] h-[60vh] md:h-[600px] snap-center relative bg-zinc-100 border border-border group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '100px 0px' }}
          >
           {/* Play Button Overlay */}
            <div 
              onClick={() => setPlayingVideo(story)}
              className={cn("absolute inset-0 flex flex-col items-center justify-center transition-opacity cursor-pointer z-10", activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100 bg-background/20 backdrop-blur-sm")}
            >
              <span className={cn("font-mono text-sm tracking-widest bg-background/80 backdrop-blur-md px-6 py-3 uppercase border transition-colors duration-300", activeIndex === index ? "border-foreground/30 text-foreground/50" : "border-border group-hover:bg-foreground group-hover:text-background")}>
                {activeIndex === index ? '[ ИГРАЕТ ] ⏸' : '[ ПАУЗА ] ▶'}
              </span>
            </div>

            {/* Video Cover Image */}
            <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
              <Image 
                src={story.image}
                alt={story.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>

            {/* Video Placeholder Styling */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="font-mono text-xs tracking-widest bg-background/80 backdrop-blur px-2 py-1 uppercase mb-2 block w-fit">
                {story.id}
              </span>
              <h3 className="text-lg md:text-xl font-bold tracking-tighter bg-background/80 backdrop-blur px-3 py-2 leading-tight">
                {story.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-16 flex justify-center md:justify-start">
        <a href="#contacts" className="inline-flex items-center justify-center px-8 py-5 bg-foreground text-background text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors border border-foreground w-full md:w-auto">
          [ Хочу такой же результат → ]
        </a>
      </div>

      {/* Custom CSS to hide scrollbar in Webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-0 md:p-8"
          >
            <button 
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-background bg-foreground/50 hover:bg-foreground backdrop-blur-md px-4 py-3 rounded-full font-mono text-xs tracking-widest uppercase transition-colors flex items-center gap-2"
            >
              <span>[</span> Закрыть <span>]</span>
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full h-full md:w-auto md:h-full md:aspect-[9/16] bg-black overflow-hidden md:shadow-2xl md:ring-1 md:ring-border"
            >
              <video
                src={playingVideo.video}
                autoPlay
                controls
                playsInline
                loop
                className="w-full h-full object-cover"
              />
              {/* Overlay title info inside video */}
              <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <p className="text-white/70 font-mono text-sm mb-2 tracking-widest">[ {playingVideo.id} ]</p>
                <h3 className="text-white font-bold tracking-tighter text-xl md:text-3xl leading-none w-5/6">
                  {playingVideo.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
