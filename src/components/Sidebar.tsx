import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    LayoutDashboard,
    Sparkles,
    Sliders,
    Download,
    Sparkle,
    HelpCircle,
    MessageSquareHeart
} from 'lucide-react';

export const Sidebar: React.FC = () => {
    const { activeView, setActiveView } = useBrandContext();

    const navigationItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'ai_workspace', label: 'AI Workspace', icon: <Sparkles size={18} /> },
        { id: 'editor', label: 'Branding Editor', icon: <Sliders size={18} /> },
        { id: 'export', label: 'Export & Resize', icon: <Download size={18} /> }
    ];

    const supportItems = [
        { id: 'help', label: 'Help & Docs', icon: <HelpCircle size={18} /> },
        { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart size={18} /> }
    ];

    return (
        <aside className="sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem', marginBottom: '1rem' }}>
                <Sparkle size={18} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Brand Kit</span>
            </div>

            <div className="sidebar-title">Global Styles</div>
            <ul className="sidebar-menu">
                {navigationItems.map((item) => (
                    <li
                        key={item.id}
                        className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
                        onClick={() => setActiveView(item.id)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>

            <div className="sidebar-title" style={{ marginTop: 'auto' }}>System</div>
            <ul className="sidebar-menu">
                {supportItems.map((item) => (
                    <li key={item.id} className="sidebar-item">
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

