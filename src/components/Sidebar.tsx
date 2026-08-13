import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    LayoutDashboard,
    Sparkles,
    Sliders,
    Download,
    Layers,
    HelpCircle,
    MessageSquareHeart,
    X
} from 'lucide-react';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
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

    const handleSelectView = (view: ViewMode) => {
        setActiveView(view);
        if (onClose) onClose();
    };

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
                <div className="brand-logo" style={{ marginBottom: '1.25rem', padding: '0.25rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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

                    {onClose && (
                        <button
                            className="mobile-close-btn"
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                color: 'var(--text-muted)'
                            }}
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className="sidebar-title">Global Styles</div>
                <ul className="sidebar-menu">
                    {navigationItems.map((item) => (
                        <li
                            key={item.id}
                            className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => handleSelectView(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-title" style={{ marginTop: 'auto' }}>System</div>
                <ul className="sidebar-menu">
                    {supportItems.map((item) => (
                        <li key={item.id} className="sidebar-item" onClick={onClose}>
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
};

