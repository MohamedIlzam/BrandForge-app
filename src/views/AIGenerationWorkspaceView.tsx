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
    Save
} from 'lucide-react';

export const AIGenerationWorkspaceView: React.FC = () => {
    const {
        brandVisionPrompt,
        setBrandVisionPrompt,
        creativeCopies,
        generateAICopy,
        setActiveView
    } = useBrandContext();

    const [brandName, setBrandName] = useState('Artisan Cold Brew');
    const [industryDomain, setIndustryDomain] = useState('Food & Beverage');
    const [targetAudience, setTargetAudience] = useState(
        'Urban professionals, coffee connoisseurs, and remote creatives aged 22–40'
    );

    const [isCoreIdentityOpen, setIsCoreIdentityOpen] = useState(false);
    const [selectedTone, setSelectedTone] = useState<string>('Inspiring');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedCopyId, setSelectedCopyId] = useState<string>(creativeCopies[0]?.id || '');
    const [isGenerating, setIsGenerating] = useState(false);

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

            {/* Main 3-Column Workspace */}
            <div className="grid-3" style={{ gridTemplateColumns: '1.1fr 1fr 1.2fr', alignItems: 'stretch' }}>
                {/* Left Column: Dedicated AI Prompt Space Card */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: 540 }}>
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

                {/* Middle Column: Generated Copy Feed */}
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Creative Copy Options</span>
                        <span className="brand-badge">{creativeCopies.length} Generated</span>
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
                            <span>Open in Layout Editor</span>
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

            {/* Core Identity Form Modal Overlay */}
            {isCoreIdentityOpen && (
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
            )}
        </div>
    );
};
