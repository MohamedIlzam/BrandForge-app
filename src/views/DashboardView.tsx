import React, { useState } from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Sparkles,
    Plus,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Palette,
    Layout,
    FileText,
    Presentation,
    Brain,
    Crown,
    ChevronDown,
    Zap,
    X,
    Lock,
    Edit3,
    Check
} from 'lucide-react';

export const DashboardView: React.FC = () => {
    const {
        brandKit,
        brandKitsList,
        activeBrandKitId,
        selectBrandKit,
        createBrandKit,
        brandKnowledge,
        updateBrandKnowledge,
        generationUsage,
        customLogoUrl,
        projects,
        setActiveView
    } = useBrandContext();

    // Local state for Knowledge editing & Modal
    const [isEditingKnowledge, setIsEditingKnowledge] = useState(false);
    const [localVisionPrompt, setLocalVisionPrompt] = useState(brandKnowledge.visionPrompt);
    const [localAudience, setLocalAudience] = useState(brandKnowledge.targetAudience);
    const [localValues, setLocalValues] = useState(brandKnowledge.brandValues);
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'Social Media' | 'Print' | 'Presentation' | 'Pro'>('All');

    // Local state for New Kit Modal
    const [showNewKitModal, setShowNewKitModal] = useState(false);
    const [newKitName, setNewKitName] = useState('');
    const [newKitFont, setNewKitFont] = useState('Plus Jakarta Sans');
    const [newKitColor, setNewKitColor] = useState('#2563eb');

    const handleSaveKnowledge = () => {
        updateBrandKnowledge({
            visionPrompt: localVisionPrompt,
            targetAudience: localAudience,
            brandValues: localValues
        });
        setIsEditingKnowledge(false);
    };

    const handleCreateKit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKitName.trim()) return;
        createBrandKit(newKitName, newKitFont, newKitColor);
        setShowNewKitModal(false);
        setNewKitName('');
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Social Media': return <Layout size={18} color="var(--primary)" />;
            case 'Print': return <FileText size={18} color="var(--primary)" />;
            case 'Presentation': return <Presentation size={18} color="var(--primary)" />;
            default: return <Layout size={18} color="var(--primary)" />;
        }
    };

    const filteredProjects = projects.filter(p => {
        if (selectedCategory === 'All') return true;
        if (selectedCategory === 'Pro') return p.isPro;
        return p.category === selectedCategory;
    });

    return (
        <div style={{ paddingBottom: '3rem' }}>
            {/* Header & Launch Action */}
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                        <h1 className="page-title" style={{ margin: 0 }}>Workspace Overview</h1>
                        <span style={{
                            background: 'linear-gradient(135deg, #14b89c, #10b981)',
                            color: '#ffffff',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            letterSpacing: '0.05em'
                        }}>
                            <Crown size={12} /> PRO TIER ACTIVE
                        </span>
                    </div>
                    <p className="page-subtitle" style={{ margin: 0 }}>Manage your Brand Knowledge Core, active Brand Kits, and deterministic design engine.</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setActiveView('ai_workspace')}
                    >
                        <Sparkles size={18} />
                        <span>Launch AI Workspace</span>
                    </button>
                </div>
            </div>

            {/* Pro Generation Usage Tracker Banner */}
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                        width: 38,
                        height: 38,
                        borderRadius: '10px',
                        background: 'var(--primary-light)',
                        color: 'var(--primary-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <Zap size={20} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>Monthly AI Generation Credits</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                ({generationUsage.used} / {generationUsage.total} Used)
                            </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            Unlimited text-free background generations & recommendation engine queries on Pro.
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexGrow: 1, maxWidth: 380 }}>
                    <div style={{ flexGrow: 1 }}>
                        <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                            <div style={{
                                width: `${(generationUsage.used / generationUsage.total) * 100}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--primary), #10b981)',
                                borderRadius: 4
                            }} />
                        </div>
                    </div>
                    <button
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', whiteSpace: 'nowrap' }}
                        onClick={() => setActiveView('ai_workspace')}
                    >
                        <Plus size={14} />
                        <span>Add Credits</span>
                    </button>
                </div>
            </div>

            {/* Main 2-Column Grid: Brand Knowledge Core & Brand Kit Manager */}
            <div className="grid-2" style={{ marginBottom: '2rem' }}>

                {/* 1. Brand Knowledge Core ("Knowledge Stage") */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div className="card-header" style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{
                                    background: 'rgba(37, 99, 235, 0.12)',
                                    padding: '0.45rem',
                                    borderRadius: '8px',
                                    color: '#2563eb'
                                }}>
                                    <Brain size={20} />
                                </div>
                                <div>
                                    <span className="card-title" style={{ fontSize: '1.05rem' }}>Brand Knowledge Core</span>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>System Feeder • Strategy Engine Source</div>
                                </div>
                            </div>
                            {!isEditingKnowledge ? (
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                                    onClick={() => setIsEditingKnowledge(true)}
                                >
                                    <Edit3 size={14} />
                                    <span>Edit Knowledge</span>
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                                    onClick={handleSaveKnowledge}
                                >
                                    <Check size={14} />
                                    <span>Save Core</span>
                                </button>
                            )}
                        </div>

                        {!isEditingKnowledge ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Brand Vision & Positioning Prompt
                                    </span>
                                    <div style={{
                                        fontSize: '0.88rem',
                                        fontWeight: 500,
                                        color: 'var(--text-main)',
                                        background: 'var(--bg-secondary)',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: '1px solid var(--border-color)',
                                        marginTop: '0.35rem',
                                        lineHeight: 1.45
                                    }}>
                                        "{brandKnowledge.visionPrompt}"
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div>
                                        <span style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Target Audience
                                        </span>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                                            {brandKnowledge.targetAudience}
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Industry Category
                                        </span>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                                            {brandKnowledge.industryCategory}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Tone of Voice & Archetype Tags
                                    </span>
                                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                                        {brandKnowledge.toneTags.map((tag, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '0.73rem',
                                                fontWeight: 700,
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '12px',
                                                background: 'var(--primary-light)',
                                                color: 'var(--primary-hover)',
                                                border: '1px solid rgba(20, 184, 156, 0.2)'
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                                        Brand Vision Prompt (Feeds AI Recommendation Engine)
                                    </label>
                                    <textarea
                                        value={localVisionPrompt}
                                        onChange={(e) => setLocalVisionPrompt(e.target.value)}
                                        rows={3}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.85rem',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                                        Target Audience
                                    </label>
                                    <input
                                        type="text"
                                        value={localAudience}
                                        onChange={(e) => setLocalAudience(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem 0.6rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                                        Brand Pillars & Core Values
                                    </label>
                                    <input
                                        type="text"
                                        value={localValues}
                                        onChange={(e) => setLocalValues(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem 0.6rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{
                        marginTop: '1.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Sparkles size={14} color="var(--primary)" />
                            <span>Connected to AI Strategy Layer</span>
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--primary-hover)' }}>Live Sync Active</span>
                    </div>
                </div>

                {/* 2. Active Brand Kit & Multi-Brand Kit Selector */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div className="card-header" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{
                                    background: 'var(--primary-light)',
                                    padding: '0.45rem',
                                    borderRadius: '8px',
                                    color: 'var(--primary-hover)'
                                }}>
                                    <Palette size={20} />
                                </div>
                                <div>
                                    <span className="card-title" style={{ fontSize: '1.05rem' }}>Brand Kit Management</span>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Deterministic Design Tokens</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                                    onClick={() => setShowNewKitModal(true)}
                                >
                                    <Plus size={14} />
                                    <span>New Kit</span>
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                                    onClick={() => setActiveView('editor')}
                                >
                                    <span>Edit Tokens</span>
                                </button>
                            </div>
                        </div>

                        {/* Multi-Brand Kit Selector Dropdown */}
                        <div style={{ marginBottom: '1.1rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                                ACTIVE BRAND KIT (MULTI-KIT PRO)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    value={activeBrandKitId}
                                    onChange={(e) => selectBrandKit(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem 2rem 0.6rem 0.75rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: '1.5px solid var(--primary)',
                                        background: 'var(--bg-secondary)',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        color: 'var(--text-main)',
                                        cursor: 'pointer',
                                        appearance: 'none'
                                    }}
                                >
                                    {brandKitsList.map((kit) => (
                                        <option key={kit.id} value={kit.id}>
                                            {kit.name} {kit.isPro ? '★ (Pro)' : ''}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={18} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--primary)' }} />
                            </div>
                        </div>

                        {/* Color Swatches */}
                        <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Palette Hex Tokens
                            </span>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.6rem', marginTop: '0.4rem' }}>
                                {brandKit.colors.map((c, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.4rem 0.5rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 6,
                                            backgroundColor: c.hex,
                                            border: '1px solid var(--border-light)',
                                            flexShrink: 0
                                        }} />
                                        <div style={{ overflow: 'hidden' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{c.name}</div>
                                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.hex}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Typography & Brand Logo Preview */}
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Locked Font:</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>{brandKit.font}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Logo:</span>
                                {customLogoUrl ? (
                                    <img src={customLogoUrl} alt="Logo" style={{ height: 18, objectFit: 'contain' }} />
                                ) : (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Default Sparkles</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '1.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem'
                    }}>
                        <span style={{ color: 'var(--text-muted)' }}>Consistency Score: <strong style={{ color: '#10b981' }}>{brandKit.consistencyScore}% Compliant</strong></span>
                        <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }} onClick={() => setActiveView('editor')}>
                            Manage Layout Rules
                        </button>
                    </div>
                </div>

            </div>

            {/* Asset Health Card */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            padding: '0.4rem',
                            borderRadius: '8px',
                            color: '#10b981'
                        }}>
                            <CheckCircle2 size={20} />
                        </div>
                        <span className="card-title" style={{ fontSize: '1.05rem' }}>Asset Health & Brand Guardrails</span>
                    </div>
                    <span style={{
                        background: 'var(--primary-light)',
                        color: 'var(--primary-hover)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontWeight: 800,
                        fontSize: '0.85rem'
                    }}>
                        {brandKit.consistencyScore}% Score
                    </span>
                </div>

                <div style={{ margin: '0.85rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        <span>Deterministic Layout Guardrails</span>
                        <span>{brandKit.consistencyScore}% Compliant</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-card-alt)', overflow: 'hidden' }}>
                        <div style={{
                            width: `${brandKit.consistencyScore}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #14b89c, #10b981)',
                            borderRadius: 4
                        }} />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    borderRadius: 'var(--border-radius-sm)',
                    flexWrap: 'wrap'
                }}>
                    <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0 }} />
                    <div style={{ fontSize: '0.82rem', color: '#92400e' }}>
                        <strong>Deterministic check:</strong> 0 unapproved fonts detected. Logo safe zone margin set to 15%.
                    </div>
                </div>
            </div>

            {/* Recent Designs & Premium Templates Section */}
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', margin: 0 }}>Design Templates & Recent Projects</h2>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Filter by format or browse Pro high-resolution layout presets.</p>
                </div>

                {/* Category Filters */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {(['All', 'Social Media', 'Print', 'Presentation', 'Pro'] as const).map((cat) => (
                        <button
                            key={cat}
                            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'Pro' ? <Crown size={12} style={{ marginRight: 4 }} /> : null}
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-4">
                {filteredProjects.map((p) => (
                    <div
                        key={p.id}
                        className="card"
                        style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                        onClick={() => setActiveView('editor')}
                    >
                        {p.isPro && (
                            <div style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                zIndex: 5,
                                background: 'linear-gradient(135deg, #14b89c, #10b981)',
                                color: '#ffffff',
                                padding: '0.25rem 0.6rem',
                                borderRadius: 12,
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                            }}>
                                <Crown size={12} /> PRO TEMPLATE
                            </div>
                        )}

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
                        <div style={{ padding: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                {getCategoryIcon(p.category)}
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{p.title}</h3>
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
                        minHeight: 220
                    }}
                    onClick={() => setActiveView('ai_workspace')}
                >
                    <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: 'var(--primary-light)',
                        color: 'var(--primary-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.6rem'
                    }}>
                        <Plus size={22} />
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Create New Design</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Generate via AI or start blank layout.
                    </p>
                </div>
            </div>

            {/* Modal to Create New Brand Kit */}
            {showNewKitModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: 440, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Crown size={18} color="var(--primary)" />
                                Create Pro Brand Kit
                            </h3>
                            <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                onClick={() => setShowNewKitModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateKit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                                    Brand Kit Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Apex Dynamics"
                                    value={newKitName}
                                    onChange={(e) => setNewKitName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                                    Primary Font Family
                                </label>
                                <select
                                    value={newKitFont}
                                    onChange={(e) => setNewKitFont(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                                    <option value="Inter">Inter</option>
                                    <option value="Outfit">Outfit</option>
                                    <option value="Roboto">Roboto</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                                    Primary Brand Accent Color
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="color"
                                        value={newKitColor}
                                        onChange={(e) => setNewKitColor(e.target.value)}
                                        style={{ width: 44, height: 38, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                                    />
                                    <input
                                        type="text"
                                        value={newKitColor}
                                        onChange={(e) => setNewKitColor(e.target.value)}
                                        style={{
                                            flexGrow: 1,
                                            padding: '0.6rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.9rem',
                                            fontWeight: 700
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
                                    onClick={() => setShowNewKitModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ flex: 1 }}
                                >
                                    Create & Activate Kit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
