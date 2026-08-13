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
    Sparkles,
    Palette,
    X
} from 'lucide-react';

const COLOR_SWATCHES = [
    { name: 'Teal Primary', hex: '#14b89c' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Vivid Cobalt', hex: '#3b82f6' },
    { name: 'Cyber Violet', hex: '#8b5cf6' },
    { name: 'Warm Amber', hex: '#f59e0b' },
    { name: 'Coral Pink', hex: '#f43f5e' },
    { name: 'Slate Dark', hex: '#0f172a' }
];

const CANVAS_BG_MODES = [
    { id: 'slate', name: 'Dark Slate', gradient: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '#334155' },
    { id: 'obsidian', name: 'Deep Obsidian', gradient: 'linear-gradient(135deg, #090d16, #020408)', border: '#1e293b' },
    { id: 'emerald', name: 'Midnight Emerald', gradient: 'linear-gradient(135deg, #064e3b, #022c22)', border: '#047857' },
    { id: 'light', name: 'Warm Light', gradient: 'linear-gradient(135deg, #ffffff, #f1f5f9)', border: '#cbd5e1' }
];

export const BrandingEditorView: React.FC = () => {
    const { editorProps, setEditorProps, brandKit, creativeCopies } = useBrandContext();
    const [activeTab, setActiveTab] = useState<'editor' | 'assets' | 'history'>('editor');
    const [targetAspectRatio, setTargetAspectRatio] = useState<'16:9' | '1:1' | '3:4' | '9:16'>('16:9');
    const [backgroundBlurDepth, setBackgroundBlurDepth] = useState<number>(0);
    const [primaryColor, setPrimaryColor] = useState<string>('#14b89c');
    const [canvasBgMode, setCanvasBgMode] = useState<string>('slate');

    const selectedCopy = creativeCopies[0];
    const currentBgObj = CANVAS_BG_MODES.find(b => b.id === canvasBgMode) || CANVAS_BG_MODES[0];

    const handleMarginChange = (val: number) => {
        setEditorProps(prev => ({ ...prev, clearSpaceMargin: val }));
    };

    const handlePlacementChange = (placement: typeof editorProps.brandMarkPlacement) => {
        setEditorProps(prev => ({ ...prev, brandMarkPlacement: placement }));
    };

    const getCanvasStyle = () => {
        switch (targetAspectRatio) {
            case '1:1':
                return { width: '100%', maxWidth: '380px', aspectRatio: '1 / 1' };
            case '3:4':
                return { width: '100%', maxWidth: '330px', aspectRatio: '3 / 4' };
            case '9:16':
                return { width: '100%', maxWidth: '250px', aspectRatio: '9 / 16' };
            case '16:9':
            default:
                return { width: '100%', maxWidth: '100%', aspectRatio: '16 / 9' };
        }
    };

    const renderPropertiesControls = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Brand Color Palette Swatches */}
            <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                    Brand Accent Color Palette
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {COLOR_SWATCHES.map((swatch) => (
                        <button
                            key={swatch.hex}
                            onClick={() => setPrimaryColor(swatch.hex)}
                            title={swatch.name}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: swatch.hex,
                                border: primaryColor === swatch.hex ? '3px solid #ffffff' : '2px solid transparent',
                                boxShadow: primaryColor === swatch.hex ? `0 0 0 2px ${swatch.hex}` : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                        >
                            {primaryColor === swatch.hex && <Check size={14} color="#ffffff" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Canvas Theme Background */}
            <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                    Canvas Background Style
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                    {CANVAS_BG_MODES.map((bg) => (
                        <button
                            key={bg.id}
                            className={`btn ${canvasBgMode === bg.id ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem', justifyContent: 'center' }}
                            onClick={() => setCanvasBgMode(bg.id)}
                        >
                            {bg.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Target Aspect Ratio Control */}
            <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                    Target Aspect Ratio
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.35rem' }}>
                    {(['16:9', '1:1', '3:4', '9:16'] as const).map((ratio) => (
                        <button
                            key={ratio}
                            className={`btn ${targetAspectRatio === ratio ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '0.45rem 0.25rem', fontSize: '0.8rem', fontWeight: 700, justifyContent: 'center' }}
                            onClick={() => setTargetAspectRatio(ratio)}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </div>

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
                    <span style={{ color: primaryColor }}>{editorProps.clearSpaceMargin}%</span>
                </div>
                <input
                    type="range"
                    min="5"
                    max="30"
                    value={editorProps.clearSpaceMargin}
                    onChange={(e) => handleMarginChange(Number(e.target.value))}
                    style={{ width: '100%', accentColor: primaryColor }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Determines the distance maintained between the brand mark and edge elements.
                </span>
            </div>

            {/* Background Blur Depth Control */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <span>Background Blur Depth</span>
                    <span style={{ color: primaryColor }}>{backgroundBlurDepth}px</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={backgroundBlurDepth}
                    onChange={(e) => setBackgroundBlurDepth(Number(e.target.value))}
                    style={{ width: '100%', accentColor: primaryColor }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Adjusts the background backdrop blur intensity for depth perception.
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
    );

    return (
        <div style={{ position: 'relative' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: primaryColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        PROJECT: ALPHA_OMNICHANNEL_v2
                    </div>
                    <h1 className="page-title">Branding & Layout Editor</h1>
                    <p className="page-subtitle">brandforge.ai/preview</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                        className={`btn ${activeTab === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('editor')}
                    >
                        <Sliders size={16} />
                        <span>Layout Engine</span>
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

            <div className="editor-workspace-grid">
                {/* Left Column: Interactive Visual Canvas */}
                <div className="card" style={{ padding: '1.25rem', background: '#0f172a', color: '#ffffff', minHeight: 480, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                            <Grid size={16} color={primaryColor} />
                            <span>Canvas Grid • Ratio: {targetAspectRatio} • Blur: {backgroundBlurDepth}px</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className="brand-badge" style={{ background: primaryColor, color: '#ffffff' }}>{editorProps.layoutEngine} Engine</span>
                        </div>
                    </div>

                    {/* Interactive Artwork Canvas */}
                    <div style={{
                        background: currentBgObj.gradient,
                        border: `2px dashed ${editorProps.focalPointRule ? primaryColor : currentBgObj.border}`,
                        borderRadius: 'var(--border-radius-md)',
                        padding: `${editorProps.clearSpaceMargin * 1.5}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                        backdropFilter: backgroundBlurDepth > 0 ? `blur(${backgroundBlurDepth}px)` : 'none',
                        WebkitBackdropFilter: backgroundBlurDepth > 0 ? `blur(${backgroundBlurDepth}px)` : 'none',
                        filter: backgroundBlurDepth > 0 ? `blur(${backgroundBlurDepth / 4}px)` : 'none',
                        margin: 'auto',
                        color: canvasBgMode === 'light' ? '#0f172a' : '#ffffff',
                        ...getCanvasStyle()
                    }}>
                        {/* Brand Mark positioned dynamically based on state */}
                        <div style={{
                            position: 'absolute',
                            top: editorProps.brandMarkPlacement.includes('Top') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            bottom: editorProps.brandMarkPlacement.includes('Bottom') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            right: editorProps.brandMarkPlacement.includes('Right') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            left: editorProps.brandMarkPlacement.includes('Left') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                            background: primaryColor,
                            color: '#ffffff',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            boxShadow: `0 4px 14px ${primaryColor}66`
                        }}>
                            <Sparkles size={12} />
                            <span>Brand Mark</span>
                        </div>

                        <div style={{ maxWidth: '90%', textAlign: 'center' }}>
                            <h2 style={{
                                fontSize: targetAspectRatio === '9:16' ? '1.3rem' : editorProps.typographyScaling === 'Fluid' ? '2.1rem' : '1.7rem',
                                fontWeight: 800,
                                lineHeight: 1.2,
                                color: canvasBgMode === 'light' ? '#0f172a' : '#ffffff',
                                marginBottom: '0.75rem',
                                letterSpacing: '-0.02em'
                            }}>
                                The future of Generative Branding is deterministic.
                            </h2>
                            <p style={{ fontSize: targetAspectRatio === '9:16' ? '0.8rem' : '0.9rem', color: canvasBgMode === 'light' ? '#475569' : '#94a3b8', lineHeight: 1.5 }}>
                                {selectedCopy ? selectedCopy.subtext : 'Sustainable energy for the modern grind.'}
                            </p>
                        </div>

                        {/* Clear Space Visual Grid Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: `${editorProps.clearSpaceMargin}px`,
                            border: `1px solid ${primaryColor}4d`,
                            pointerEvents: 'none',
                            borderRadius: '8px'
                        }} />
                    </div>
                </div>

                {/* Right Column: Editor Properties Panel */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Palette size={20} color={primaryColor} />
                            <span className="card-title">Editor Properties & Colors</span>
                        </div>
                    </div>

                    {renderPropertiesControls()}
                </div>
            </div>
        </div>
    );
};

