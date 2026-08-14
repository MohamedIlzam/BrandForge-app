import React, { useState } from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Sparkles,
    Wand2,
    Copy,
    Check,
    Sliders,
    Download,
    RefreshCw,
    Tag,
    Fingerprint,
    Building2,
    Users,
    BadgeCheck,
    X,
    Save,
    BrainCircuit,
    ShieldCheck,
    Palette,
    Target,
    Lightbulb,
    CheckCircle2,
    Info,
    Lock,
    Image as ImageIcon,
    Upload,
    Plus
} from 'lucide-react';

export const AIGenerationWorkspaceView: React.FC = () => {
    const {
        brandVisionPrompt,
        setBrandVisionPrompt,
        creativeCopies,
        generateAICopy,
        setActiveView,
        brandKnowledge,
        brandKit,
        logoList,
        activeLogoId,
        selectLogo,
        addLogo,
        customLogoUrl
    } = useBrandContext();

    const [brandName, setBrandName] = useState('Artisan Cold Brew');
    const [industryDomain, setIndustryDomain] = useState('Food & Beverage');
    const [targetAudience, setTargetAudience] = useState(
        'Urban professionals, coffee connoisseurs, and remote creatives aged 22–40'
    );

    const [isCoreIdentityOpen, setIsCoreIdentityOpen] = useState(false);
    const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
    const [selectedTone, setSelectedTone] = useState<string>('Inspiring');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedCopyId, setSelectedCopyId] = useState<string>(creativeCopies[0]?.id || '');
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const presetPrompts = [
        { label: '⚡ Artisanal Coffee', text: 'Sustainable artisan cold brew for high-performing remote professionals and coffee purists.' },
        { label: '🌿 Eco Luxury', text: 'Zero-waste luxury skincare crafted with organic botanical extracts for conscious consumers.' },
        { label: '🚀 Tech SaaS', text: 'AI-driven workflow platform designed for high-velocity software engineering teams.' },
        { label: '🎨 Minimalist Studio', text: 'Swiss functional modernist design agency creating timeless brand identities.' }
    ];

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            generateAICopy(brandVisionPrompt);
            setIsGenerating(false);
            setHasGenerated(true);
        }, 600);
    };

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const selectedCopy = creativeCopies.find(c => c.id === selectedCopyId) || creativeCopies[0];

    return (
        <div>
            {/* Page Header with Right-Side Core Identity Button */}
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="page-title">AI Generation Workspace</h1>
                    <p className="page-subtitle">Translate brand vision into deterministic slogans, typography pairings, and generative collateral.</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {/* Add / Manage Logo Button */}
                    <button
                        className="btn btn-secondary"
                        onClick={() => setIsLogoModalOpen(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            padding: '0.65rem 1.1rem',
                            borderRadius: 'var(--border-radius-md)',
                            border: '1px solid var(--border-light)',
                            backgroundColor: '#ffffff',
                            boxShadow: 'var(--shadow-sm)',
                            cursor: 'pointer'
                        }}
                    >
                        <ImageIcon size={18} color="var(--primary)" />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Logo</span>
                        <span className="brand-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                            {logoList.length} LOGOS
                        </span>
                    </button>

                    {/* Core Identity Button */}
                    <button
                        className="btn btn-secondary"
                        onClick={() => setIsCoreIdentityOpen(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.65rem 1.1rem',
                            borderRadius: 'var(--border-radius-md)',
                            border: '1px solid var(--border-light)',
                            backgroundColor: '#ffffff',
                            boxShadow: 'var(--shadow-sm)',
                            cursor: 'pointer'
                        }}
                    >
                        <Fingerprint size={18} color="var(--primary)" />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Core Identity</span>
                        <span className="brand-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                            <BadgeCheck size={10} /> ACTIVE
                        </span>
                    </button>
                </div>
            </div>

            {/* Main 3-Column Workspace */}
            <div className="ai-workspace-grid">
                {/* Left Column: Dedicated AI Prompt Space Card */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Wand2 size={20} color="var(--primary)" />
                            <span className="card-title">AI Prompt Space</span>
                        </div>
                        <span className="brand-badge">ENGINE v2</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                                Brand Vision & Persona Strategy Prompt
                            </label>
                            <textarea
                                rows={5}
                                value={brandVisionPrompt}
                                onChange={(e) => setBrandVisionPrompt(e.target.value)}
                                placeholder="Describe your brand vision, core values, or positioning strategy..."
                                style={{
                                    width: '100%',
                                    padding: '0.85rem',
                                    borderRadius: 'var(--border-radius-sm)',
                                    border: '1px solid var(--border-light)',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    color: 'var(--text-main)',
                                    backgroundColor: 'var(--bg-app)',
                                    resize: 'none',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {/* Quick Presets */}
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                                Quick Vision Presets
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {presetPrompts.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setBrandVisionPrompt(preset.text)}
                                        style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            padding: '0.3rem 0.6rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-light)',
                                            backgroundColor: '#ffffff',
                                            color: 'var(--text-main)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Creative Tone Selection */}
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                                Brand Tone & Voice Alignment
                            </label>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                {['Bold & Direct', 'Clean & Minimal', 'Inspiring'].map((tone) => (
                                    <button
                                        key={tone}
                                        onClick={() => setSelectedTone(tone)}
                                        className={`btn ${selectedTone === tone ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ flex: 1, padding: '0.35rem 0.4rem', fontSize: '0.75rem' }}
                                    >
                                        {tone}
                                    </button>
                                ))}
                            </div>
                            {/* Choose Logo Selector */}
                            <div style={{
                                padding: '0.85rem',
                                borderRadius: 'var(--border-radius-sm)',
                                border: '1px solid var(--border-light)',
                                backgroundColor: '#ffffff',
                                marginTop: '0.75rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <ImageIcon size={14} color="var(--primary)" /> Choose Logo
                                    </label>
                                    <button
                                        onClick={() => setIsLogoModalOpen(true)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--primary)',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}
                                    >
                                        <Plus size={12} /> Add Logo
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {logoList.map(logo => {
                                        const isSelected = activeLogoId === logo.id;
                                        return (
                                            <button
                                                key={logo.id}
                                                onClick={() => selectLogo(logo.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    padding: '0.35rem 0.6rem',
                                                    borderRadius: '6px',
                                                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                                                    backgroundColor: isSelected ? 'rgba(20, 184, 156, 0.08)' : 'var(--bg-app)',
                                                    color: isSelected ? 'var(--primary-dark)' : 'var(--text-main)',
                                                    fontWeight: isSelected ? 700 : 500,
                                                    fontSize: '0.725rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                {logo.url ? (
                                                    <img src={logo.url} alt={logo.name} style={{ width: 14, height: 14, objectFit: 'contain', borderRadius: 2 }} />
                                                ) : (
                                                    <div style={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: 3,
                                                        backgroundColor: 'var(--primary)',
                                                        color: '#ffffff',
                                                        fontWeight: 800,
                                                        fontSize: '8px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        BF
                                                    </div>
                                                )}
                                                <span>{logo.name}</span>
                                                {isSelected && <Check size={11} color="var(--primary)" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem 1rem' }}
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                                    <span>Generating Creative Collateral...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    <span>Generate Creative Assets</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Middle Column: Generated Copy Feed */}
                <div className="card">
                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', gap: '0.5rem' }}>
                        <span className="card-title" style={{ whiteSpace: 'nowrap', fontSize: '0.95rem' }}>Creative Copy Options</span>
                        <span className="brand-badge" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{creativeCopies.length} GENERATED</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: 480, overflowY: 'auto' }}>
                        {creativeCopies.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedCopyId(item.id)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--border-radius-sm)',
                                    border: selectedCopyId === item.id ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                                    background: selectedCopyId === item.id ? 'var(--primary-glow)' : 'var(--bg-card)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                        {item.headline}
                                    </h3>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(item.id, `${item.headline} - ${item.subtext}`);
                                        }}
                                    >
                                        {copiedId === item.id ? <Check size={14} color="var(--primary)" /> : <Copy size={14} />}
                                    </button>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                                    {item.subtext}
                                </p>
                                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.75rem' }}>
                                    {item.tags.map((tag, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            background: 'var(--bg-card-alt)',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: 12,
                                            color: 'var(--text-muted)'
                                        }}>
                                            <Tag size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Real-time Live Preview Card */}
                <div className="card" style={{ background: '#0f172a', color: '#ffffff' }}>
                    <div className="card-header" style={{ borderColor: 'var(--border-dark)' }}>
                        <span className="card-title" style={{ color: '#ffffff' }}>Live Concept Preview</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-sidebar)' }}>Plus Jakarta Sans</span>
                    </div>

                    {/* Canvas Poster Mockup */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: 'var(--border-radius-md)',
                        padding: '2.5rem 1.75rem',
                        textAlign: 'center',
                        minHeight: 280,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            color: 'var(--primary)',
                            textTransform: 'uppercase'
                        }}>
                            BRANDFORGE AI
                        </div>

                        {customLogoUrl ? (
                            <img
                                src={customLogoUrl}
                                alt="Brand Logo"
                                style={{
                                    maxHeight: 48,
                                    maxWidth: 130,
                                    objectFit: 'contain',
                                    marginBottom: '1.25rem'
                                }}
                            />
                        ) : (
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '1.2rem'
                            }}>
                                BF
                            </div>
                        )}

                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem', color: '#ffffff' }}>
                            {selectedCopy ? selectedCopy.headline : 'Brewing Better Mornings.'}
                        </h2>

                        <p style={{ fontSize: '0.95rem', color: '#94a3b8', maxWidth: '85%', margin: '0 auto' }}>
                            {selectedCopy ? selectedCopy.subtext : 'Sustainable energy for the modern grind.'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                        <button
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                            onClick={() => setActiveView('editor')}
                        >
                            <Sliders size={16} />
                            <span>Open in Branding Editor</span>
                        </button>
                        <button
                            className="btn btn-secondary"
                            style={{ background: 'transparent', borderColor: 'var(--border-dark)', color: '#ffffff' }}
                            onClick={() => setActiveView('export')}
                        >
                            <Download size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Recommendation Strategy & Rationale Card (Frosted Glass Overlay Aesthetic - Shown only after generation) */}
            {hasGenerated && (
                <div className="card" style={{
                    marginTop: '1.75rem',
                    border: '1px solid rgba(20, 184, 156, 0.25)',
                    borderTop: '2px solid var(--primary)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(240, 253, 250, 0.5) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.9), 0 10px 30px -5px rgba(20, 184, 156, 0.08)',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Frosted Glass Reflection Sheen */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '45%',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                        pointerEvents: 'none',
                        zIndex: 0
                    }} />

                    <div className="card-header" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{
                                background: 'var(--primary-glow)',
                                color: 'var(--primary)',
                                padding: '0.5rem',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <BrainCircuit size={22} />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <h3 className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>Why AI Generated This Design</h3>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.3rem',
                                        fontSize: '0.68rem',
                                        fontWeight: 700,
                                        color: '#059669',
                                        backgroundColor: '#d1fae5',
                                        padding: '0.15rem 0.55rem',
                                        borderRadius: '12px'
                                    }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                                        SYNCED WITH BRAND KIT
                                    </span>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        color: '#475569',
                                        backgroundColor: '#e2e8f0',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '4px',
                                        letterSpacing: '0.03em'
                                    }}>
                                        <Lock size={10} />
                                        AUTO-GENERATED
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                    How AI aligned copy, background art, and colors with your brand rules.
                                </p>
                            </div>
                        </div>

                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--primary)',
                            backgroundColor: 'var(--primary-glow)',
                            border: '1px solid rgba(20, 184, 156, 0.25)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '20px'
                        }}>
                            <Info size={14} color="var(--primary)" />
                            <span>Overview</span>
                        </span>
                    </div>

                    <div className="grid-3" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {/* Copy & Persona Rationale */}
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            padding: '1.1rem',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                <Target size={16} color="var(--primary)" />
                                <span>Copy & Messaging Strategy</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                                Crafted for <strong style={{ color: 'var(--text-main)' }}>{brandKnowledge?.targetAudience || 'Urban professionals'}</strong> using an <strong style={{ color: 'var(--primary)' }}>#{selectedTone}</strong> voice to maximize engagement.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.2rem' }}>
                                {(brandKnowledge?.toneTags || ['Energetic', 'Modernist']).map((tag, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.68rem',
                                        fontWeight: 700,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid var(--border-light)',
                                        color: 'var(--text-main)',
                                        padding: '0.15rem 0.45rem',
                                        borderRadius: '6px'
                                    }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Visual Atmosphere & Palette Choice */}
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            padding: '1.1rem',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                <Palette size={16} color="var(--primary)" />
                                <span>Visual Style & Colors</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                                Background art created matching your <strong style={{ color: 'var(--text-main)' }}>{brandKit?.name || 'Active Brand Kit'}</strong> colors ({brandKit?.colors?.[0]?.hex || '#14b89c'}) and industry vibe.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                                {(brandKit?.colors || []).slice(0, 3).map((c, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', fontWeight: 600 }}>
                                        <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c.hex, border: '1px solid rgba(0,0,0,0.1)' }} />
                                        <span>{c.hex}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Deterministic Rules & Guarantees */}
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            padding: '1.1rem',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                <ShieldCheck size={16} color="#10b981" />
                                <span>Brand Rules Enforced</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <CheckCircle2 size={13} color="#10b981" />
                                    <span><strong>Text-Free Background:</strong> Clean art with zero AI text clutter</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <CheckCircle2 size={13} color="#10b981" />
                                    <span><strong>Pristine Logo:</strong> Vector logo placed safely without distortion</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <CheckCircle2 size={13} color="#10b981" />
                                    <span><strong>Official Font:</strong> Enforces <em>{brandKit?.font || 'Plus Jakarta Sans'}</em> across copy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Core Identity Form Modal Overlay */}
            {
                isCoreIdentityOpen && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem'
                    }}>
                        <div className="card" style={{
                            width: '100%',
                            maxWidth: '520px',
                            backgroundColor: '#ffffff',
                            boxShadow: 'var(--shadow-xl)',
                            borderRadius: 'var(--border-radius-lg)',
                            padding: '1.75rem',
                            animation: 'fadeIn 0.2s ease-out'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Fingerprint size={22} color="var(--primary)" />
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                        Core Identity Parameters
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsCoreIdentityOpen(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                                        <Building2 size={14} color="var(--primary)" />
                                        Brand Name <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.85rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-light)',
                                            fontFamily: 'inherit',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'var(--text-main)',
                                            backgroundColor: 'var(--bg-app)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                                        <Building2 size={14} color="var(--text-muted)" />
                                        Industry / Domain <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={industryDomain}
                                        onChange={(e) => setIndustryDomain(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.85rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-light)',
                                            fontFamily: 'inherit',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'var(--text-main)',
                                            backgroundColor: 'var(--bg-app)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                                        <Users size={14} color="var(--text-muted)" />
                                        Target Audience Profile
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={targetAudience}
                                        onChange={(e) => setTargetAudience(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.85rem',
                                            borderRadius: 'var(--border-radius-sm)',
                                            border: '1px solid var(--border-light)',
                                            fontFamily: 'inherit',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.45,
                                            color: 'var(--text-main)',
                                            backgroundColor: 'var(--bg-app)',
                                            resize: 'none',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setIsCoreIdentityOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsCoreIdentityOpen(false)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                >
                                    <Save size={16} />
                                    <span>Save Core Identity</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Add & Manage Logo Modal */}
            {
                isLogoModalOpen && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}>
                        <div className="card" style={{
                            width: '100%',
                            maxWidth: '520px',
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            overflow: 'hidden',
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ImageIcon size={20} color="var(--primary)" />
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Add & Manage Brand Logos</h3>
                                </div>
                                <button onClick={() => setIsLogoModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}>
                                    <X size={18} color="var(--text-muted)" />
                                </button>
                            </div>

                            <div style={{ overflowY: 'auto', paddingRight: '0.2rem', marginTop: '1rem' }}>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Upload New Logo Image (PNG / SVG / JPG)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    const result = event.target?.result as string;
                                                    if (result) {
                                                        addLogo(file.name.replace(/\.[^/.]+$/, ""), result);
                                                        setIsLogoModalOpen(false);
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        style={{ display: 'none' }}
                                        id="logo-modal-upload-input"
                                    />
                                    <label
                                        htmlFor="logo-modal-upload-input"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '1.5rem',
                                            border: '2px dashed var(--primary)',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(20, 184, 156, 0.04)',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Upload size={24} color="var(--primary)" />
                                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-dark)' }}>
                                            Click to browse or upload logo image
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            Supports transparent PNG, vector SVG, JPG
                                        </span>
                                    </label>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Brand Logo Library ({logoList.length})
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                                        {logoList.map(logo => {
                                            const isSelected = activeLogoId === logo.id;
                                            return (
                                                <div
                                                    key={logo.id}
                                                    onClick={() => {
                                                        selectLogo(logo.id);
                                                        setIsLogoModalOpen(false);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                                                        backgroundColor: isSelected ? 'rgba(20, 184, 156, 0.08)' : 'var(--bg-app)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '0.4rem',
                                                        cursor: 'pointer',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {isSelected && (
                                                        <div style={{ position: 'absolute', top: 6, right: 6 }}>
                                                            <CheckCircle2 size={14} color="var(--primary)" />
                                                        </div>
                                                    )}
                                                    {logo.url ? (
                                                        <img src={logo.url} alt={logo.name} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                                                    ) : (
                                                        <div style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 8,
                                                            backgroundColor: 'var(--primary)',
                                                            color: '#ffffff',
                                                            fontWeight: 800,
                                                            fontSize: '1rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            BF
                                                        </div>
                                                    )}
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', color: 'var(--text-main)' }}>
                                                        {logo.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)', textAlign: 'right' }}>
                                <button className="btn btn-secondary" onClick={() => setIsLogoModalOpen(false)}>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};
