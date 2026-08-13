import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    LayoutDashboard,
    Sparkles,
    Sliders,
    Download,
    Layers,
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
            <div className="brand-logo" style={{ marginBottom: '1.25rem', padding: '0.25rem 0.5rem' }}>
                <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #14b89c, #0d9488)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                }}>
                    <Layers size={20} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>BrandForge</span>
                <span className="brand-badge">PRO</span>
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

