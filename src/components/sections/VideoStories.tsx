'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { Play, X } from 'lucide-react';

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
    const { scrollLeft, scrollWidth } = scrollRef.current;

    // Calculate active index based on scroll position
    const itemWidth = scrollWidth / STORIES.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < STORIES.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="results" className="relative py-24 lg:py-32 z-10 w-full overflow-hidden" ref={containerRef}>
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
        <div className="max-w-2xl">
          <ScrollRevealItem baseY={20}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
              Видео-отчёты
            </h2>
          </ScrollRevealItem>
          <ScrollRevealItem baseY={30}>
            <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
              Результаты<br />
              <span className="text-black/30">наших работ</span>
            </h3>
          </ScrollRevealItem>
        </div>

        <ScrollRevealItem baseY={30} className="hidden md:flex flex-col items-end gap-3 pb-2">
          <div className="font-bold text-[13px] tracking-widest text-black/40">
            {String(activeIndex + 1).padStart(2, '0')} / {String(STORIES.length).padStart(2, '0')}
          </div>
          <div className="w-[120px] h-1.5 bg-black/5 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#1D1D1F] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / STORIES.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </ScrollRevealItem>
      </ScrollRevealContainer>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 md:pl-8 pr-[50vw] gap-6 pb-8"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {STORIES.map((story, index) => (
          <motion.div
            key={story.id}
            className="shrink-0 w-[85vw] md:w-[380px] h-[55vh] md:h-[500px] snap-center relative rounded-[32px] overflow-hidden bg-black/5 border border-black/5 group cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
            viewport={{ once: true, margin: '100px 0px' }}
            onClick={() => setPlayingVideo(story)}
          >
            {/* Smooth Video Cover Image */}
            <Image
              src={story.image}
              alt={story.title}
              fill
              sizes="(max-width: 768px) 85vw, 380px"
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            {/* Elegant Gradients */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none transition-opacity duration-500" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

            {/* Play Button Pill (floating) */}
            <div className="absolute inset-0 m-auto w-[72px] h-[72px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white z-20 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1D1D1F] group-hover:border-transparent transition-all duration-500 shadow-2xl">
              <Play fill="currentColor" size={24} className="ml-1" />
            </div>

            {/* Video Post Meta */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest text-white uppercase border border-white/10">
                  Кейс {story.id}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tighter text-white leading-[1.1]">
                {story.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom CSS to hide scrollbar in Webkit */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
            onClick={() => setPlayingVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-[420px] aspect-[9/16] max-h-[85vh] bg-black overflow-hidden rounded-[32px] md:rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/10 cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute top-4 right-4 z-[110] w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 rounded-full transition-all"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              <video
                src={playingVideo.video}
                autoPlay
                controls
                playsInline
                loop
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full p-6 pt-16 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none">
                <p className="text-white/70 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Кейс {playingVideo.id}</p>
                <h3 className="text-white font-black tracking-tighter text-xl md:text-2xl leading-[1.1] max-w-[85%]">
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
