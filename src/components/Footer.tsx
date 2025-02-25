export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center relative pb-2 pointer-events-auto">
      {/* Main Footer */}
      <div className="w-[90%] max-w-[1600px]">
        <footer className="py-4 px-6 flex items-center justify-between border-t-2 border-[hsl(333.3,71.4%,50.6%)] bg-[hsl(222.2,84%,4.9%)] rounded-2xl">
          {/* Logo and Links */}
          <div className="flex items-center gap-8">
            <div className="h-6">
              <img src="/next.svg" alt="Next.js Logo" className="h-full brightness-0 invert" />
            </div>
            
            {/* Separator */}
            <div className="h-8 w-[2px] bg-[hsl(333.3,71.4%,50.6%)]"></div>
            
            {/* Footer Links */}
            <nav>
              <ul className="flex gap-6 text-[#F2F2F2]">
                <li><a href="#" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">Imprint</a></li>
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="px-3 py-1.5 text-sm text-[#F2F2F2] hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
              Twitter
            </a>
            <a href="#" className="px-3 py-1.5 text-sm text-[#F2F2F2] hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
              GitHub
            </a>
            <a href="#" className="px-3 py-1.5 text-sm text-[#F2F2F2] hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
