import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    Plus,
    Check,
    Menu,
    Layers
} from 'lucide-react';

interface HeaderProps {
    onToggleMobileMenu?: () => void;
}

export const Header: React.FC = () => {
    const { activeView, setActiveView } = useBrandContext();

    const steps: { id: ViewMode; label: string }[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'ai_workspace', label: 'AI Workspace' },
        { id: 'editor', label: 'Branding Editor' },
        { id: 'export', label: 'Export' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === activeView);

    return (
        <header className="header-nav">
            {/* Brand Logo & Name */}
            <div className="brand-logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }} onClick={() => setActiveView('dashboard')}>
                <img
                    src="/logo.png"
                    alt="BrandForge Logo"
                    style={{
                        height: 'auto',
                        maxHeight: '44px',
                        width: 'auto',
                        objectFit: 'contain'
                    }}
                />
                <span className="brand-title" style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>BrandForge</span>
                <span className="brand-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>PRO</span>
            </div>

            {/* Non-clickable Horizontal Workflow Stepper */}
            <div className="workflow-stepper">
                {steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;

                    return (
                        <React.Fragment key={step.id}>
                            <div className={`step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                                <div className="step-circle">
                                    {isCompleted ? <Check size={12} strokeWidth={3} /> : idx + 1}
                                </div>
                                <span>{step.label}</span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`step-connector ${idx < currentStepIndex ? 'completed' : ''}`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="user-actions">
                <button
                    className="btn"
                    onClick={() => setActiveView('ai_workspace')}
                    style={{
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.85rem',
                        background: '#006853',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '30px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 4px 12px rgba(0, 104, 83, 0.25)',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={16} />
                    <span className="btn-label-desktop">New Design</span>
                </button>
            </div>
        </header>
    );
};

