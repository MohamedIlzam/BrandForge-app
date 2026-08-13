import React from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Palette,
    Type,
    ShieldCheck,
    Image as ImageIcon,
    Sparkle,
    HelpCircle,
    MessageSquareHeart,
    Wand2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
    const { activeView, setActiveView } = useBrandContext();

    const brandKitItems = [
        { id: 'brand_kit', label: 'Brand Kit', icon: <Wand2 size={18} />, view: 'dashboard' as const },
        { id: 'typography', label: 'Typography', icon: <Type size={18} />, view: 'editor' as const },
        { id: 'colors', label: 'Color Palette', icon: <Palette size={18} />, view: 'editor' as const },
        { id: 'logos', label: 'Logos & Assets', icon: <ShieldCheck size={18} />, view: 'export' as const },
        { id: 'imagery', label: 'Imagery & AI', icon: <ImageIcon size={18} />, view: 'ai_workspace' as const }
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
                {brandKitItems.map((item) => (
                    <li
                        key={item.id}
                        className={`sidebar-item ${activeView === item.view ? 'active' : ''}`}
                        onClick={() => setActiveView(item.view)}
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
