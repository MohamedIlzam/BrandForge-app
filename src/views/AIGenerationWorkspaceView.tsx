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
    Tag
} from 'lucide-react';

export const AIGenerationWorkspaceView: React.FC = () => {
    const {
        brandVisionPrompt,
        setBrandVisionPrompt,
        creativeCopies,
        generateAICopy,
        setActiveView
    } = useBrandContext();

    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedCopyId, setSelectedCopyId] = useState<string>(creativeCopies[0]?.id || '');
    const [isGenerating, setIsGenerating] = useState(false);

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
            <div className="page-header">
                <h1 className="page-title">AI Generation Workspace</h1>
                <p className="page-subtitle">Translate brand vision into deterministic slogans, typography pairings, and generative collateral.</p>
            </div>

            <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr 1.2fr', alignItems: 'start' }}>
                {/* Left Column: Prompt Input */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Wand2 size={20} color="var(--primary)" />
                            <span className="card-title">Brand Vision Prompt</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                            Describe Your Vision & Target Persona
                        </label>
                        <textarea
                            rows={5}
                            value={brandVisionPrompt}
                            onChange={(e) => setBrandVisionPrompt(e.target.value)}
                            placeholder="e.g. Sustainable energy coffee brand for modern tech professionals..."
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                borderRadius: 'var(--border-radius-sm)',
                                border: '1px solid var(--border-light)',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                resize: 'vertical',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                                <span>Generating Copy & Concepts...</span>
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
        </div>
    );
};
