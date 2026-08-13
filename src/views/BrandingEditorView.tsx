import React, { useState, useRef } from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Sliders,
    Layers,
    Grid,
    Info,
    RotateCcw,
    Sparkles,
    Palette,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Upload,
    Image as ImageIcon,
    ZoomIn,
    ZoomOut,
    Trash2,
    Check
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
    const { editorProps, setEditorProps, creativeCopies, customLogoUrl, setCustomLogoUrl } = useBrandContext();
    const [activeTab, setActiveTab] = useState<'editor' | 'assets' | 'history'>('editor');
    const [targetAspectRatio, setTargetAspectRatio] = useState<'16:9' | '1:1' | '3:4' | '9:16'>('16:9');
    const [backgroundBlurDepth, setBackgroundBlurDepth] = useState<number>(0);
    const [primaryColor, setPrimaryColor] = useState<string>('#14b89c');
    const [canvasBgMode, setCanvasBgMode] = useState<string>('slate');
    const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
    const [textPosition, setTextPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [logoPosition, setLogoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [draggingElement, setDraggingElement] = useState<'text' | 'logo' | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileDrop = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setCustomLogoUrl(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileDrop(file);
        }
    };

    // Canvas Mouse Dragging Handlers for Text and Logo Repositioning
    const handleMouseDown = (element: 'text' | 'logo', e: React.MouseEvent) => {
        e.preventDefault();
        setDraggingElement(element);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingElement) return;
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setDragStart({ x: e.clientX, y: e.clientY });

        if (draggingElement === 'text') {
            setTextPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        } else if (draggingElement === 'logo') {
            setLogoPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        }
    };

    const handleMouseUp = () => {
        setDraggingElement(null);
    };

    const resetDragPositions = () => {
        setTextPosition({ x: 0, y: 0 });
        setLogoPosition({ x: 0, y: 0 });
    };

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

            {/* Brand Mark Placement & Custom Logo Upload */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                        Brand Mark & Custom Logo
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                    />
                </div>

                {/* Drag and Drop File Zone */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                    onDragLeave={() => setIsDraggingFile(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingFile(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileDrop(file);
                    }}
                    style={{
                        padding: '0.85rem',
                        border: `2px dashed ${isDraggingFile ? primaryColor : 'var(--border-color)'}`,
                        borderRadius: 'var(--border-radius-sm)',
                        background: isDraggingFile ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        textAlign: 'center',
                        marginBottom: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload size={18} color={primaryColor} style={{ marginBottom: '0.35rem' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        {isDraggingFile ? 'Drop Logo File Here!' : customLogoUrl ? 'Click or Drag File to Replace Logo' : 'Drag & Drop Custom Logo (PNG/SVG)'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Or click to browse from device</div>
                </div>

                {customLogoUrl && (
                    <button
                        className="btn btn-secondary"
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center', color: '#f43f5e', marginBottom: '0.75rem' }}
                        onClick={() => setCustomLogoUrl(null)}
                    >
                        <Trash2 size={14} />
                        <span>Remove Custom Logo</span>
                    </button>
                )}

                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Brand Mark Position Guidelines:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {/* Row 1: Top-Left & Top-Right */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {(['Top-Left', 'Top-Right'] as const).map((pos) => (
                            <button
                                key={pos}
                                className={`btn ${editorProps.brandMarkPlacement === pos ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
                                onClick={() => handlePlacementChange(pos)}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>

                    {/* Row 2: Center taking whole space */}
                    <button
                        className={`btn ${editorProps.brandMarkPlacement === 'Center' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ width: '100%', padding: '0.4rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
                        onClick={() => handlePlacementChange('Center')}
                    >
                        Center
                    </button>

                    {/* Row 3: Bottom-Left & Bottom-Right */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {(['Bottom-Left', 'Bottom-Right'] as const).map((pos) => (
                            <button
                                key={pos}
                                className={`btn ${editorProps.brandMarkPlacement === pos ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
                                onClick={() => handlePlacementChange(pos)}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>
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

            {/* Interactive Text Alignment & Scale */}
            <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                    Typography Alignment & Scale
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <button
                        className={`btn ${editorProps.textAlign === 'left' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '0.45rem', justifyContent: 'center' }}
                        onClick={() => setEditorProps(prev => ({ ...prev, textAlign: 'left' }))}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        className={`btn ${editorProps.textAlign === 'center' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '0.45rem', justifyContent: 'center' }}
                        onClick={() => setEditorProps(prev => ({ ...prev, textAlign: 'center' }))}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        className={`btn ${editorProps.textAlign === 'right' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '0.45rem', justifyContent: 'center' }}
                        onClick={() => setEditorProps(prev => ({ ...prev, textAlign: 'right' }))}
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Font Size Scale:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                            className="btn btn-secondary"
                            style={{ padding: '0.25rem 0.5rem', minWidth: 'auto' }}
                            onClick={() => setEditorProps(prev => ({ ...prev, fontSizeMultiplier: Math.max(0.7, (prev.fontSizeMultiplier || 1) - 0.15) }))}
                            title="Decrease Font Size"
                        >
                            <ZoomOut size={14} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: primaryColor, minWidth: '42px', textAlign: 'center' }}>
                            {Math.round((editorProps.fontSizeMultiplier || 1.0) * 100)}%
                        </span>
                        <button
                            className="btn btn-secondary"
                            style={{ padding: '0.25rem 0.5rem', minWidth: 'auto' }}
                            onClick={() => setEditorProps(prev => ({ ...prev, fontSizeMultiplier: Math.min(1.8, (prev.fontSizeMultiplier || 1) + 0.15) }))}
                            title="Increase Font Size"
                        >
                            <ZoomIn size={14} />
                        </button>
                    </div>
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
                    <strong>Desktop Interactivity:</strong> Drag & drop logo files onto the uploader or directly drag canvas elements with your mouse cursor!
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ position: 'relative' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: primaryColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
                        PROJECT: ALPHA_OMNICHANNEL_v2
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem' }}>Branding & Layout Editor</h1>
                        <span className="page-subtitle" style={{ margin: 0, fontSize: '0.85rem' }}>brandforge.ai/preview</span>
                    </div>
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
                <div className="card editor-canvas-card" style={{ padding: '1rem', background: '#0f172a', color: '#ffffff', minHeight: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                            <Grid size={16} color={primaryColor} />
                            <span>Canvas Grid • Ratio: {targetAspectRatio}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {(textPosition.x !== 0 || textPosition.y !== 0 || logoPosition.x !== 0 || logoPosition.y !== 0) && (
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', background: '#1e293b' }}
                                    onClick={resetDragPositions}
                                >
                                    <RotateCcw size={12} />
                                    <span>Reset Drag</span>
                                </button>
                            )}
                            <span className="brand-badge" style={{ background: primaryColor, color: '#ffffff' }}>{editorProps.layoutEngine} Engine</span>
                        </div>
                    </div>

                    {/* Interactive Artwork Canvas */}
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleFileDrop(file);
                        }}
                        style={{
                            background: currentBgObj.gradient,
                            border: `2px dashed ${editorProps.focalPointRule ? primaryColor : currentBgObj.border}`,
                            borderRadius: 'var(--border-radius-md)',
                            padding: `${editorProps.clearSpaceMargin * 1.5}px`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: editorProps.textAlign === 'left' ? 'flex-start' : editorProps.textAlign === 'right' ? 'flex-end' : 'center',
                            position: 'relative',
                            transition: draggingElement ? 'none' : 'all 0.3s ease',
                            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                            backdropFilter: backgroundBlurDepth > 0 ? `blur(${backgroundBlurDepth}px)` : 'none',
                            WebkitBackdropFilter: backgroundBlurDepth > 0 ? `blur(${backgroundBlurDepth}px)` : 'none',
                            filter: backgroundBlurDepth > 0 ? `blur(${backgroundBlurDepth / 4}px)` : 'none',
                            margin: '0 auto',
                            color: canvasBgMode === 'light' ? '#0f172a' : '#ffffff',
                            overflow: 'hidden',
                            ...getCanvasStyle()
                        }}
                    >
                        {/* Brand Mark positioned dynamically & Draggable via Mouse */}
                        <div
                            onMouseDown={(e) => handleMouseDown('logo', e)}
                            style={{
                                position: 'absolute',
                                top: editorProps.brandMarkPlacement.includes('Top') ? `${editorProps.clearSpaceMargin}px` : editorProps.brandMarkPlacement === 'Center' ? '50%' : 'auto',
                                bottom: editorProps.brandMarkPlacement.includes('Bottom') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                                right: editorProps.brandMarkPlacement.includes('Right') ? `${editorProps.clearSpaceMargin}px` : 'auto',
                                left: editorProps.brandMarkPlacement.includes('Left') ? `${editorProps.clearSpaceMargin}px` : editorProps.brandMarkPlacement === 'Center' ? '50%' : 'auto',
                                transform: editorProps.brandMarkPlacement === 'Center'
                                    ? `translate(calc(-50% + ${logoPosition.x}px), calc(-50% + ${logoPosition.y}px))`
                                    : `translate(${logoPosition.x}px, ${logoPosition.y}px)`,
                                cursor: 'grab',
                                userSelect: 'none',
                                background: primaryColor,
                                color: '#ffffff',
                                padding: customLogoUrl ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
                                borderRadius: '8px',
                                fontWeight: 800,
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                boxShadow: `0 4px 14px ${primaryColor}66`,
                                zIndex: 10
                            }}
                            title="Click and drag to reposition Brand Mark"
                        >
                            {customLogoUrl ? (
                                <img src={customLogoUrl} alt="Custom Brand Logo" style={{ height: 20, maxHeight: 24, objectFit: 'contain', borderRadius: 4 }} />
                            ) : (
                                <>
                                    <Sparkles size={12} />
                                    <span>Brand Mark</span>
                                </>
                            )}
                        </div>

                        <div
                            onMouseDown={(e) => handleMouseDown('text', e)}
                            style={{
                                maxWidth: '90%',
                                textAlign: editorProps.textAlign || 'center',
                                transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
                                cursor: 'grab',
                                userSelect: 'none',
                                zIndex: 5,
                                padding: '0.4rem',
                                borderRadius: '8px',
                                transition: draggingElement === 'text' ? 'none' : 'transform 0.2s ease'
                            }}
                            title="Click and drag to reposition Text"
                        >
                            <h2 style={{
                                fontSize: `${(targetAspectRatio === '9:16' ? 1.3 : editorProps.typographyScaling === 'Fluid' ? 2.1 : 1.7) * (editorProps.fontSizeMultiplier || 1.0)}rem`,
                                fontWeight: 800,
                                lineHeight: 1.2,
                                color: canvasBgMode === 'light' ? '#0f172a' : '#ffffff',
                                marginBottom: '0.75rem',
                                letterSpacing: '-0.02em',
                                transition: 'font-size 0.2s ease'
                            }}>
                                The future of Generative Branding is deterministic.
                            </h2>
                            <p style={{ fontSize: `${(targetAspectRatio === '9:16' ? 0.8 : 0.9) * (editorProps.fontSizeMultiplier || 1.0)}rem`, color: canvasBgMode === 'light' ? '#475569' : '#94a3b8', lineHeight: 1.5 }}>
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
                <div className="card editor-properties-card">
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

