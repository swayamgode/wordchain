import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MonsterAvatar } from '../components/doodles/MonsterAvatars';
import { TopoDoodlePattern } from '../components/doodles/DoodleBackground';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-xl mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-28 h-28 bg-white border-3 border-[#111111] rounded-3xl flex items-center justify-center shadow-[4px_4px_0px_#111111] animate-doodle-bounce">
          <MonsterAvatar id="monty" size={75} mood="dizzy" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest bg-[#FFC928] border-2 border-[#111111] px-3 py-1 rounded-full shadow-[2px_2px_0px_#111111]">
            404 Error &bull; Missing Link
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Broken Chain!
          </h1>
          <p className="text-sm font-medium text-[#555555] max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist, has expired, or the room session has ended.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/" className="doodle-btn-yellow py-3 px-6 text-xs sm:text-sm flex items-center gap-2">
            <Home size={16} /> Return to Home
          </Link>
          <Link href="/blog" className="doodle-btn py-3 px-6 text-xs sm:text-sm bg-white flex items-center gap-2">
            <ArrowLeft size={16} /> Browse Articles
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
