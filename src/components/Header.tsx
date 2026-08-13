import React from 'react';
import { useBrandContext, ViewMode } from '../context/BrandContext';
import {
    Sparkles,
    Check,
    Menu,
    Layers
} from 'lucide-react';

interface HeaderProps {
    onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
    const { activeView, setActiveView } = useBrandContext();
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || document.querySelector('.content-area')?.scrollTop || 0;
            setIsScrolled(scrollTop > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (contentArea) {
                contentArea.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const steps: { id: ViewMode; label: string }[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'ai_workspace', label: 'AI Workspace' },
        { id: 'editor', label: 'Branding Editor' },
        { id: 'export', label: 'Export & Resize' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === activeView);

    return (
        <header className={`header-nav ${isScrolled ? 'scrolled' : ''}`}>
            {/* Mobile Header Brand & Hamburger Button */}
            <div className="mobile-header-bar">
                <button
                    className="mobile-hamburger-btn"
                    onClick={onToggleMobileMenu}
                    aria-label="Open Menu"
                >
                    <Menu size={22} />
                </button>
                <div className="mobile-brand-title">
                    <Layers size={18} color="var(--primary)" />
                    <span>BrandForge</span>
                </div>
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
                    className="btn btn-primary"
                    onClick={() => setActiveView('ai_workspace')}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                    <Sparkles size={16} />
                    <span className="btn-label-desktop">New Generation</span>
                </button>
            </div>
        </header>
    );
};

