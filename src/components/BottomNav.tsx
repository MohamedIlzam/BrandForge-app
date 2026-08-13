import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    LayoutDashboard,
    Sparkles,
    Sliders,
    Download
} from 'lucide-react';

export const BottomNav: React.FC = () => {
    const { activeView, setActiveView } = useBrandContext();

    const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'ai_workspace', label: 'AI Generator', icon: <Sparkles size={20} /> },
        { id: 'editor', label: 'Editor', icon: <Sliders size={20} /> },
        { id: 'export', label: 'Export', icon: <Download size={20} /> }
    ];

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveView(item.id)}
                            aria-label={item.label}
                        >
                            <div className="bottom-nav-icon">
                                {item.icon}
                            </div>
                            <span className="bottom-nav-label">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
