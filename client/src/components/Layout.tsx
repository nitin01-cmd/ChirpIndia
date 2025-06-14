import { ReactNode } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar />
          {children}
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-border lg:hidden z-50">
        <div className="flex justify-around py-3">
          <button className="p-2 text-saffron">
            <i className="fas fa-home text-xl"></i>
          </button>
          <button className="p-2 text-muted-foreground">
            <i className="fas fa-search text-xl"></i>
          </button>
          <button className="p-2 text-muted-foreground">
            <i className="fas fa-bell text-xl"></i>
          </button>
          <button className="p-2 text-muted-foreground">
            <i className="fas fa-envelope text-xl"></i>
          </button>
          <button className="p-2 text-muted-foreground">
            <i className="fas fa-user text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-saffron-gradient text-white rounded-full shadow-lg hover:scale-110 transition-transform floating-btn lg:hidden z-40">
        <i className="fas fa-plus text-xl"></i>
      </button>
    </div>
  );
}
