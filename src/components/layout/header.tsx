'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Logo } from '../logo';

const navLinks = [
  { 
    href: "/#features", 
    label: "Features",
    submenu: [
      { href: "/features/expense-tracking", label: "Expense Tracking" },
      { href: "/features/budgeting", label: "Budgeting" },
      { href: "/features/reports-analytics", label: "Reports & Analytics" },
    ]
  },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/subscription", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    } else {
        setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-charcoal/95 backdrop-blur-md border-champagne/30 shadow-md' 
          : 'bg-charcoal/80 backdrop-blur-sm border-transparent',
        'supports-[backdrop-filter]:bg-charcoal/80'
      )}
    >
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link 
          href="/" 
          className="group relative z-10"
          onClick={() => setOpenDropdown(null)}
        >
          <Logo variant="default" size="md" />
        </Link>

        {isMobile ? (
          <>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative z-10 h-10 w-10 rounded-xl hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[280px] sm:w-[350px] p-0 bg-background/95 backdrop-blur-lg border-l border-border/20"
                onInteractOutside={() => setIsMenuOpen(false)}
              >
                <div className="h-full overflow-y-auto">
                  <nav className="flex flex-col py-6 px-5">
                    {navLinks.map((link) => (
                      <div key={link.href} className="border-b border-border/20 last:border-0">
                        <Link
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.href)}
                          className="flex items-center justify-between py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors duration-200"
                        >
                          {link.label}
                          {link.submenu && <ChevronDown className="h-4 w-4 ml-2 opacity-70" />}
                        </Link>
                        
                        {link.submenu && (
                          <div className="pl-4 pb-2 space-y-2">
                            {link.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border/20">
                      <Button asChild variant="outline" className="h-11 rounded-xl font-medium">
                        <Link href="/auth" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button 
                        asChild 
                        className="h-11 rounded-xl font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-200"
                      >
                        <Link href="/auth" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    onMouseEnter={() => link.submenu && setOpenDropdown(link.href)}
                    className={cn(
                      'px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                      'text-ivory/90 hover:text-emerald hover:bg-champagne/20',
                      'flex items-center gap-1',
                      openDropdown === link.href && 'text-emerald bg-champagne/10'
                    )}
                  >
                    {link.label}
                    {link.submenu && (
                      <ChevronDown className={cn(
                        'h-4 w-4 ml-0.5 transition-transform duration-200 text-champagne',
                        openDropdown === link.href ? 'rotate-180' : ''
                      )} />
                    )}
                  </Link>
                </div>
                
                {link.submenu && (
                  <div 
                    className={cn(
                      'absolute left-0 top-full mt-1 w-56 origin-top-left rounded-xl bg-background p-2 shadow-lg ring-1 ring-border/20 ring-opacity-5',
                      'opacity-0 invisible transition-all duration-200 transform -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
                      'backdrop-blur-lg bg-background/95 border border-border/20',
                      openDropdown === link.href ? 'opacity-100 visible translate-y-0' : ''
                    )}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="py-1">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-foreground/5 rounded-lg transition-colors duration-150"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center gap-2 ml-4">
              <Button asChild variant="ghost" className="h-10 px-5 rounded-xl font-medium text-emerald hover:bg-champagne/20">
                  <Link href="/auth">Login</Link>
              </Button>
              <Button 
                asChild 
                className="h-10 px-5 rounded-xl font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-200"
              >
                <Link href="/auth">Sign Up</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
