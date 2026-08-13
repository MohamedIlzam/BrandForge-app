import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    LayoutDashboard,
    Sparkles,
    Sliders,
    Download,
    Layers,
    FolderKanban,
    Check
} from 'lucide-react';

export const Header: React.FC = () => {
    const { activeView, setActiveView, brandKit } = useBrandContext();

    const steps: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
        { id: 'ai_workspace', label: 'AI Workspace', icon: <Sparkles size={14} /> },
        { id: 'editor', label: 'Branding Editor', icon: <Sliders size={14} /> },
        { id: 'export', label: 'Export & Resize', icon: <Download size={14} /> }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === activeView);

    return (
        <header className="header-nav">
            <div className="brand-logo">
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
                <span>BrandForge</span>
                <span className="brand-badge">PRO</span>
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
                                {step.icon}
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
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--bg-card-alt)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                }}>
                    <FolderKanban size={16} color="var(--primary)" />
                    <span>{brandKit.name}</span>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => setActiveView('ai_workspace')}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                    <Sparkles size={16} />
                    <span>New Generation</span>
                </button>
            </div>
        </header>
    );
};
