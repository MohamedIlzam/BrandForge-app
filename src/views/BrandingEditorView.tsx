import React, { useState } from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Sliders,
    Layers,
    Grid,
    Info,
    RotateCcw,
    Eye,
    Check,
    Maximize2,
    Lock,
    Sparkles
} from 'lucide-react';

export const BrandingEditorView: React.FC = () => {
    const { editorProps, setEditorProps, brandKit, creativeCopies } = useBrandContext();
    const [activeTab, setActiveTab] = useState<'editor' | 'assets' | 'history'>('editor');

    const selectedCopy = creativeCopies[0];

    const handleMarginChange = (val: number) => {
        setEditorProps(prev => ({ ...prev, clearSpaceMargin: val }));
    };

    const handlePlacementChange = (placement: typeof editorProps.brandMarkPlacement) => {
        setEditorProps(prev => ({ ...prev, brandMarkPlacement: placement }));
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        PROJECT: ALPHA_OMNICHANNEL_v2
                    </div>
                    <h1 className="page-title">Branding & Layout Editor</h1>
                    <p className="page-subtitle">brandforge.ai/preview</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        className={`btn ${activeTab === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('editor')}
                    >
                        <Sliders size={16} />
                        <span>Editor</span>
                    </button>
                    <button
                        className={`btn ${activeTab === 'assets' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('assets')}
                    >
                        <Layers size={16} />
                        <span>Assets</span>
                    </button>
                    <button
                        className={`btn ${activeTab === 'history' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <RotateCcw size={16} />
                        <span>History</span>
                    </button>
                </div>
            </div>

            <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
                {/* Left Column: Interactive Visual Canvas */}
                <div className="card" style={{ padding: '1.5rem', background: '#0f172a', color: '#ffffff', minHeight: 520, position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                            <Grid size={16} color="var(--primary)" />
                            <span>Canvas Boundary Grid • Clear Space: {editorProps.clearSpaceMargin}%</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span className="brand-badge">{editorProps.layoutEngine} Engine</span>
                        </div>
                    </div>

                    {/* Interactive Artwork Canvas */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                        border: `2px dashed ${editorProps.focalPointRule ? 'var(--primary)' : '#334155'}`,
                        borderRadius: 'var(--border-radius-md)',
                        padding: `${editorProps.clearSpaceMargin * 2}px`,
                        minHeight: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)'
                    }}>
                        {/* Brand Mark positioned dynamically based on state */}
                        <div style={{
                            position: 'absolute',
                            top: editorProps.brandMarkPlacement.includes('Top') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            bottom: editorProps.brandMarkPlacement.includes('Bottom') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            right: editorProps.brandMarkPlacement.includes('Right') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            left: editorProps.brandMarkPlacement.includes('Left') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            background: 'var(--primary)',
                            color: '#ffffff',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            boxShadow: 'var(--shadow-glow)'
                        }}>
                            <Sparkles size={14} />
                            <span>Brand Mark</span>
                        </div>

                        <div style={{ maxWidth: '85%', textAlign: 'center' }}>
                            <h2 style={{
                                fontSize: editorProps.typographyScaling === 'Fluid' ? '2.4rem' : '2.1rem',
                                fontWeight: 800,
                                lineHeight: 1.2,
                                color: '#ffffff',
                                marginBottom: '1rem',
                                letterSpacing: '-0.02em'
                            }}>
                                The future of Generative Branding is deterministic.
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
                                {selectedCopy ? selectedCopy.subtext : 'Sustainable energy for the modern grind.'}
                            </p>
                        </div>

                        {/* Clear Space Visual Grid Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: `${editorProps.clearSpaceMargin}px`,
                            border: '1px solid rgba(20, 184, 156, 0.3)',
                            pointerEvents: 'none',
                            borderRadius: '8px'
                        }} />
                    </div>
                </div>

                {/* Right Column: Editor Properties Panel */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sliders size={20} color="var(--primary)" />
                            <span className="card-title">Editor Properties</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Layout Engine Mode */}
                        <div>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                                Layout Engine Mode
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {(['Deterministic', 'Adaptive', 'Manual'] as const).map((mode) => (
                                    <button
                                        key={mode}
                                        className={`btn ${editorProps.layoutEngine === mode ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ flex: 1, padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}
                                        onClick={() => setEditorProps(prev => ({ ...prev, layoutEngine: mode }))}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Clear Space Margin Control */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                <span>Clear Space Margin</span>
                                <span style={{ color: 'var(--primary)' }}>{editorProps.clearSpaceMargin}%</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="30"
                                value={editorProps.clearSpaceMargin}
                                onChange={(e) => handleMarginChange(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--primary)' }}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Determines the distance maintained between the brand mark and edge elements.
                            </span>
                        </div>

                        {/* Brand Mark Placement */}
                        <div>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                                Brand Mark Position
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                {(['Top-Right', 'Top-Left', 'Center', 'Bottom-Right'] as const).map((pos) => (
                                    <button
                                        key={pos}
                                        className={`btn ${editorProps.brandMarkPlacement === pos ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}
                                        onClick={() => handlePlacementChange(pos)}
                                    >
                                        {pos}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Smart Engine Info Box */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            padding: '0.85rem 1rem',
                            background: 'var(--primary-light)',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid rgba(20, 184, 156, 0.3)'
                        }}>
                            <Info size={18} color="var(--primary-hover)" style={{ marginTop: 2, flexShrink: 0 }} />
                            <div style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', lineHeight: 1.4 }}>
                                <strong>Smart Engine Rule:</strong> Smart engine will automatically shift typography to maintain {editorProps.clearSpaceMargin}% clear space around active focal points.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
