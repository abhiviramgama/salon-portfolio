import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { LogoMark } from '../components/Logo';

export default function NotFoundPage() {
  return (
    <>
      <title>Page not found — ÉLORA SALON</title>
      <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-[#151412] pb-20 pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#C5A572]/[0.09] blur-[120px]"
        />
        <div className="container-custom text-center">
          <LogoMark size={72} className="mx-auto mb-8" />
          <p className="font-sans text-sm font-semibold text-[#C5A572]">Error 404</p>
          <h1 className="mt-3 font-serif text-5xl font-bold text-[#F7F3EC] [text-wrap:balance] sm:text-6xl">
            This page has stepped out
          </h1>
          <p className="mx-auto mt-5 max-w-md font-sans text-lg leading-relaxed text-[#A9A197]">
            The link may be old or mistyped. Let’s get you back to something beautiful.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-gold px-8 py-4 text-sm font-bold tracking-wider">
              <Home size={17} /> Back to home
            </Link>
            <Link to="/services" className="btn-outline-ivory px-8 py-4 text-sm font-bold tracking-wider">
              See the treatments <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
