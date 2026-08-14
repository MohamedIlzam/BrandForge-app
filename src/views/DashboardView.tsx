import React, { useState } from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Sparkles,
    Plus,
    Layout,
    FileText,
    Presentation,
    Brain,
    Crown,
    ChevronDown,
    Zap,
    X,
    Palette,
    Check,
    Layers,
    Edit3
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

    // Modal Visibility States
    const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
    const [showBrandKitModal, setShowBrandKitModal] = useState(false);
    const [showNewKitModal, setShowNewKitModal] = useState(false);

    // Form Local States for Brand Knowledge
    const [localVisionPrompt, setLocalVisionPrompt] = useState(brandKnowledge.visionPrompt);
    const [localAudience, setLocalAudience] = useState(brandKnowledge.targetAudience);
    const [localIndustry, setLocalIndustry] = useState(brandKnowledge.industryCategory);
    const [localValues, setLocalValues] = useState(brandKnowledge.brandValues);
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'Social Media' | 'Print' | 'Presentation' | 'Pro'>('All');

    // New Kit Modal States
    const [newKitName, setNewKitName] = useState('');
    const [newKitFont, setNewKitFont] = useState('Plus Jakarta Sans');
    const [newKitColor, setNewKitColor] = useState('#2563eb');

    const handleSaveKnowledge = (e: React.FormEvent) => {
        e.preventDefault();
        updateBrandKnowledge({
            visionPrompt: localVisionPrompt,
            targetAudience: localAudience,
            industryCategory: localIndustry,
            brandValues: localValues
        });
        setShowKnowledgeModal(false);
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
            {/* Header & Right-Aligned Credits Pill Button */}
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ maxWidth: '680px' }}>
                    <h1 className="page-title" style={{ fontSize: '2.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                        Welcome Back
                    </h1>
                    <p className="page-subtitle" style={{ margin: '0.35rem 0 0 0', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                        Welcome back. Grab your $9.50 cold brew while we do the heavy lifting to make your café design workflow effortless.
                    </p>
                </div>

                {/* Right Side: Credits Pill Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                        className="btn"
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            padding: '0.55rem 1.1rem',
                            borderRadius: '30px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: 'var(--shadow-sm)',
                            cursor: 'pointer'
                        }}
                        onClick={() => setActiveView('ai_workspace')}
                    >
                        <Zap size={16} color="var(--primary)" />
                        <span>{generationUsage.used} / {generationUsage.total} Credits</span>
                    </button>
                </div>
            </div>

            {/* Action Pill Buttons Bar */}
            <div style={{ marginBottom: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                        className="btn"
                        style={{
                            background: 'var(--primary)',
                            color: '#ffffff',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '30px',
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(20, 184, 156, 0.28)',
                            transition: 'transform 0.15s ease, background-color 0.15s ease'
                        }}
                        onClick={() => setShowKnowledgeModal(true)}
                    >
                        <Edit3 size={18} />
                        <span>Edit Brand Knowledge</span>
                    </button>

                    <button
                        className="btn"
                        style={{
                            background: 'var(--primary)',
                            color: '#ffffff',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '30px',
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(20, 184, 156, 0.28)',
                            transition: 'transform 0.15s ease, background-color 0.15s ease'
                        }}
                        onClick={() => setShowBrandKitModal(true)}
                    >
                        <Layers size={18} />
                        <span>Manage Brand Kits</span>
                    </button>
                </div>
            </div>

            {/* Recent Designs Section */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-main)' }}>
                        Recent Designs
                    </h2>
                </div>

                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => setSelectedCategory(selectedCategory === 'All' ? 'Social Media' : 'All')}
                >
                    View All
                </button>
            </div>

            {/* Project Cards Grid - 3 cards in a single row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[
                    {
                        ...filteredProjects[0],
                        postType: 'Social Media Carousel • 1080×1080',
                        status: 'Published',
                        statusBg: '#ecfdf5',
                        statusColor: '#047857'
                    },
                    {
                        ...filteredProjects[1],
                        postType: 'Print & Digital Flyer • A2 Poster',
                        status: 'Ready to Print',
                        statusBg: '#eff6ff',
                        statusColor: '#1d4ed8'
                    },
                    {
                        ...filteredProjects[2],
                        postType: 'Presentation Deck • 16:9 HD',
                        status: 'Exported PDF',
                        statusBg: '#f0fdf4',
                        statusColor: '#006853'
                    }
                ].map((p, idx) => (
                    <div
                        key={p.id || idx}
                        className="card"
                        style={{
                            padding: 0,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onClick={() => setActiveView('editor')}
                    >
                        <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: 'var(--bg-secondary)' }}>
                            <img
                                src={p.thumbnailUrl}
                                alt={p.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '1.1rem 1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                                    {p.title}
                                </h3>
                                <span style={{
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    padding: '0.2rem 0.55rem',
                                    borderRadius: '10px',
                                    background: p.statusBg,
                                    color: p.statusColor,
                                    whiteSpace: 'nowrap'
                                }}>
                                    {p.status}
                                </span>
                            </div>

                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                                {p.postType}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.8 }}>
                                {p.updatedAt}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal 1: Edit Brand Knowledge Form */}
            {showKnowledgeModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: 540, padding: '1.75rem', borderRadius: '18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{
                                    background: 'var(--primary-light)',
                                    padding: '0.45rem',
                                    borderRadius: '10px',
                                    color: 'var(--primary)'
                                }}>
                                    <Brain size={22} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Edit Brand Knowledge Core</h3>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Feeds AI Strategy & Recommendation Engine</div>
                                </div>
                            </div>
                            <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                onClick={() => setShowKnowledgeModal(false)}
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveKnowledge} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                                    Brand Vision & Positioning Prompt
                                </label>
                                <textarea
                                    value={localVisionPrompt}
                                    onChange={(e) => setLocalVisionPrompt(e.target.value)}
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.65rem 0.8rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.88rem',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                                        Target Audience
                                    </label>
                                    <input
                                        type="text"
                                        value={localAudience}
                                        onChange={(e) => setLocalAudience(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.75rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.88rem'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                                        Industry Category
                                    </label>
                                    <input
                                        type="text"
                                        value={localIndustry}
                                        onChange={(e) => setLocalIndustry(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.75rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.88rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                                    Brand Pillars & Core Values
                                </label>
                                <input
                                    type="text"
                                    value={localValues}
                                    onChange={(e) => setLocalValues(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem 0.75rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.88rem'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                                    Tone Archetypes & Tags
                                </label>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {brandKnowledge.toneTags.map((tag, idx) => (
                                        <span key={idx} style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            padding: '0.25rem 0.65rem',
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

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
                                    onClick={() => setShowKnowledgeModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ flex: 1, background: '#006853', border: 'none' }}
                                >
                                    <Check size={16} /> Save Knowledge Core
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 2: Manage Brand Kits Form */}
            {showBrandKitModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: 540, padding: '1.75rem', borderRadius: '18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{
                                    background: 'var(--primary-light)',
                                    padding: '0.45rem',
                                    borderRadius: '10px',
                                    color: 'var(--primary)'
                                }}>
                                    <Palette size={22} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Manage Brand Kits</h3>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deterministic Design Tokens & Multi-Kit Setup</div>
                                </div>
                            </div>
                            <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                onClick={() => setShowBrandKitModal(false)}
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Active Kit Dropdown */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                                        ACTIVE BRAND KIT
                                    </label>
                                    <button
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                                        onClick={() => setShowNewKitModal(true)}
                                    >
                                        <Plus size={12} /> New Pro Kit
                                    </button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={activeBrandKitId}
                                        onChange={(e) => selectBrandKit(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.65rem 2rem 0.65rem 0.8rem',
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
                                    <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--primary)' }} />
                                </div>
                            </div>

                            {/* Color Tokens */}
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                                    Palette Hex Tokens
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                                    {brandKit.colors.map((c, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            padding: '0.5rem 0.65rem',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            <div style={{
                                                width: 26,
                                                height: 26,
                                                borderRadius: 6,
                                                backgroundColor: c.hex,
                                                border: '1px solid var(--border-light)',
                                                flexShrink: 0
                                            }} />
                                            <div style={{ overflow: 'hidden' }}>
                                                <div style={{ fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{c.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.hex}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Typography & Logo Preview */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Primary Font</span>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>{brandKit.font}</span>
                                </div>

                                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Brand Logo</span>
                                    {customLogoUrl ? (
                                        <img src={customLogoUrl} alt="Logo" style={{ height: 20, objectFit: 'contain' }} />
                                    ) : (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>Default Sparkles Logo</span>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
                                    onClick={() => setShowBrandKitModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1, background: '#006853', border: 'none' }}
                                    onClick={() => {
                                        setShowBrandKitModal(false);
                                        setActiveView('editor');
                                    }}
                                >
                                    Edit Tokens in Branding Editor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 3: Create New Brand Kit Form */}
            {showNewKitModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: 440, padding: '1.5rem', borderRadius: '16px' }}>
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
                                    style={{ flex: 1, background: '#006853', border: 'none' }}
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
