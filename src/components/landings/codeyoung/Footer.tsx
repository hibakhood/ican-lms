export default function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/60 py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <p className="text-sm font-medium text-slate-500">© {new Date().getFullYear()} CodeYoung. All rights reserved.</p>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900">Privacy</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
          <a href="#" className="hover:text-slate-900">Contact</a>
        </div>
      </div>
    </footer>
  )
}
