import React from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Sparkles,
    Plus,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Type,
    Palette,
    Layout,
    FileText,
    Presentation
} from 'lucide-react';

export const DashboardView: React.FC = () => {
    const { brandKit, projects, setActiveView } = useBrandContext();

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Social Media': return <Layout size={18} color="var(--primary)" />;
            case 'Print': return <FileText size={18} color="var(--primary)" />;
            case 'Presentation': return <Presentation size={18} color="var(--primary)" />;
            default: return <Layout size={18} color="var(--primary)" />;
        }
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="page-title">Workspace Overview</h1>
                    <p className="page-subtitle">Manage your brand assets, design consistency, and recent projects.</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setActiveView('ai_workspace')}
                >
                    <Sparkles size={18} />
                    <span>Launch AI Workspace</span>
                </button>
            </div>

            {/* Brand Kit Summary & Health Grid */}
            <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
                {/* Active Brand Kit Card */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{
                                background: 'var(--primary-light)',
                                padding: '0.4rem',
                                borderRadius: '8px',
                                color: 'var(--primary-hover)'
                            }}>
                                <Palette size={20} />
                            </div>
                            <span className="card-title">Active Brand Kit</span>
                        </div>
                        <button
                            className="btn btn-secondary"
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                            onClick={() => setActiveView('editor')}
                        >
                            Edit Kit
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Core Colors
                            </span>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                {brandKit.colors.map((c, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            backgroundColor: c.hex,
                                            border: '1px solid var(--border-light)',
                                            boxShadow: 'var(--shadow-sm)'
                                        }} />
                                        <div>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{c.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.hex}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Typography & Brand Mark
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 8,
                                    background: 'var(--bg-card-alt)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    color: 'var(--text-main)'
                                }}>
                                    Aa
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{brandKit.font}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary Brand Typeface (Weights: 400, 600, 800)</div>
                                </div>
                            </div>

                            {/* Custom Logo Status Preview */}
                            <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Brand Logo:</div>
                                {useBrandContext().customLogoUrl ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <img src={useBrandContext().customLogoUrl!} alt="Uploaded Brand Logo" style={{ height: 22, maxHeight: 24, objectFit: 'contain' }} />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-hover)', fontWeight: 700 }}>Custom Logo Active</span>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <Sparkles size={12} color="var(--primary)" />
                                        <span>Default Sparkles Brand Mark</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asset Health Card */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                padding: '0.4rem',
                                borderRadius: '8px',
                                color: '#10b981'
                            }}>
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="card-title">Asset Health & Consistency</span>
                        </div>
                        <span style={{
                            background: 'var(--primary-light)',
                            color: 'var(--primary-hover)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                        }}>
                            {brandKit.consistencyScore}% Score
                        </span>
                    </div>

                    <div style={{ margin: '1rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            <span>Brand Alignment</span>
                            <span>{brandKit.consistencyScore}% Compliant</span>
                        </div>
                        <div style={{ height: 10, borderRadius: 5, background: 'var(--bg-card-alt)', overflow: 'hidden' }}>
                            <div style={{
                                width: `${brandKit.consistencyScore}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #14b89c, #10b981)',
                                borderRadius: 5
                            }} />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem 1rem',
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: 'var(--border-radius-sm)',
                        marginTop: '1.25rem'
                    }}>
                        <AlertTriangle size={20} color="#d97706" />
                        <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
                            <strong>Attention needed:</strong> Looking good! {brandKit.warningsCount} templates need font alignment updates.
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Designs Section */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.01em' }}>Recent Designs</h2>
                <button
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                    onClick={() => setActiveView('editor')}
                >
                    <span>View All Projects</span>
                    <ArrowRight size={16} />
                </button>
            </div>

            <div className="grid-4">
                {projects.map((p) => (
                    <div
                        key={p.id}
                        className="card"
                        style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                        onClick={() => setActiveView('editor')}
                    >
                        <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={p.thumbnailUrl}
                                alt={p.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                background: 'rgba(15, 23, 42, 0.75)',
                                color: '#ffffff',
                                padding: '0.2rem 0.6rem',
                                borderRadius: 20,
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                backdropFilter: 'blur(4px)'
                            }}>
                                {p.category}
                            </div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                {getCategoryIcon(p.category)}
                                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{p.title}</h3>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.updatedAt}</div>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <div
                    className="card"
                    style={{
                        border: '2px dashed var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: 'transparent',
                        minHeight: 240
                    }}
                    onClick={() => setActiveView('ai_workspace')}
                >
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'var(--primary-light)',
                        color: 'var(--primary-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.75rem'
                    }}>
                        <Plus size={24} />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Create New</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Start from a template or blank canvas.
                    </p>
                </div>
            </div>
        </div>
    );
};
