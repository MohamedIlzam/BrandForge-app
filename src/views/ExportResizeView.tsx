import React, { useState } from 'react';
import { useBrandContext } from '../context/BrandContext';
import {
    Download,
    CheckCircle2,
    Instagram,
    FileText,
    Tv,
    Sparkles,
    FileCheck,
    Layers
} from 'lucide-react';

export const ExportResizeView: React.FC = () => {
    const { exportPresets, brandKit, editorProps, customLogoUrl, creativeCopies } = useBrandContext();
    const [selectedFormat, setSelectedFormat] = useState<'PNG' | 'SVG' | 'PDF'>('PNG');
    const [selectedQuality, setSelectedQuality] = useState<'300 DPI' | '72 DPI'>('300 DPI');
    const [includeCropMarks, setIncludeCropMarks] = useState<boolean>(true);
    const [isExporting, setIsExporting] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);

    const selectedCopy = creativeCopies[0];

    const downloadMockAsset = (filename: string, contentText: string) => {
        const element = document.createElement("a");
        const file = new Blob([contentText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleSingleExport = (presetTitle: string) => {
        const formatExt = selectedFormat.toLowerCase();
        const cleanName = presetTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const filename = `brandforge_${cleanName}_${selectedQuality.replace(' ', '')}.${formatExt}`;
        const content = `BrandForge Export Artifact\nPreset: ${presetTitle}\nFormat: ${selectedFormat} (${selectedQuality})\nCrop Marks: ${includeCropMarks ? 'Enabled (3mm Bleed)' : 'Disabled'}\nBrand: ${brandKit.name}\nFont: ${brandKit.font}\nText: ${selectedCopy ? selectedCopy.headline : 'The future of Generative Branding is deterministic.'}`;
        downloadMockAsset(filename, content);
    };

    const handleBatchExport = () => {
        setIsExporting(true);
        setExportComplete(false);
        setTimeout(() => {
            exportPresets.forEach((preset, idx) => {
                setTimeout(() => handleSingleExport(preset.title), idx * 250);
            });
            setIsExporting(false);
            setExportComplete(true);
            setTimeout(() => setExportComplete(false), 4000);
        }, 1000);
    };

    const getPresetIcon = (title: string) => {
        if (title.includes('Instagram')) return <Instagram size={24} color="var(--primary)" />;
        if (title.includes('Flyer')) return <FileText size={24} color="var(--primary)" />;
        return <Tv size={24} color="var(--primary)" />;
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="page-title">Export & Multi-Format Render</h1>
                    <p className="page-subtitle">Deterministic collateral rendering with production crop marks & vector resolution.</p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleBatchExport}
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <>
                            <Layers size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                            <span>Rendering All 3 Formats...</span>
                        </>
                    ) : exportComplete ? (
                        <>
                            <CheckCircle2 size={18} />
                            <span>All Assets Downloaded!</span>
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            <span>Batch Export All Formats</span>
                        </>
                    )}
                </button>
            </div>

            {/* Global Export Settings */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header">
                    <span className="card-title">Global Production Render Settings</span>
                    <span className="brand-badge">Vector Engine Active</span>
                </div>

                <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                            File Format
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(['PNG', 'SVG', 'PDF'] as const).map((fmt) => (
                                <button
                                    key={fmt}
                                    className={`btn ${selectedFormat === fmt ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ flex: 1, position: 'relative' }}
                                    onClick={() => setSelectedFormat(fmt)}
                                >
                                    <span>{fmt}</span>
                                    {(fmt === 'SVG' || fmt === 'PDF') && (
                                        <span style={{
                                            fontSize: '0.6rem',
                                            fontWeight: 800,
                                            background: selectedFormat === fmt ? '#ffffff' : 'var(--primary)',
                                            color: selectedFormat === fmt ? 'var(--primary)' : '#ffffff',
                                            padding: '0.1rem 0.35rem',
                                            borderRadius: '4px',
                                            marginLeft: '0.3rem'
                                        }}>
                                            PRO
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                            Output Resolution
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(['300 DPI', '72 DPI'] as const).map((q) => (
                                <button
                                    key={q}
                                    className={`btn ${selectedQuality === q ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ flex: 1 }}
                                    onClick={() => setSelectedQuality(q)}
                                >
                                    {q === '300 DPI' ? 'Print 300 DPI (Pro)' : 'Web (72 DPI)'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                            Print Bleed & Crop Marks
                        </label>
                        <button
                            className={`btn ${includeCropMarks ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => setIncludeCropMarks(!includeCropMarks)}
                        >
                            <FileCheck size={16} />
                            <span>{includeCropMarks ? '3mm Crop Marks Enabled' : 'No Crop Marks'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Export Format Cards */}
            <div className="grid-3">
                {exportPresets.map((preset) => (
                    <div key={preset.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{
                                    background: 'var(--primary-light)',
                                    padding: '0.5rem',
                                    borderRadius: '8px'
                                }}>
                                    {getPresetIcon(preset.title)}
                                </div>
                                <div>
                                    <h3 className="card-title" style={{ fontSize: '1.05rem' }}>{preset.title}</h3>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{preset.dimensions}</div>
                                </div>
                            </div>
                        </div>

                        {/* Live Canvas Side-by-Side Preview */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                            borderRadius: 'var(--border-radius-sm)',
                            height: 230,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: editorProps.textAlign === 'left' ? 'flex-start' : editorProps.textAlign === 'right' ? 'flex-end' : 'center',
                            margin: '1rem 0',
                            padding: '1.5rem',
                            color: '#ffffff',
                            textAlign: editorProps.textAlign || 'center',
                            position: 'relative',
                            boxShadow: 'var(--shadow-sm)',
                            border: includeCropMarks ? '2px dashed var(--primary)' : '1px solid var(--border-color)',
                            overflow: 'hidden'
                        }}>
                            {/* Brand Logo in Preview */}
                            <div style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'var(--primary)',
                                color: '#ffffff',
                                padding: '0.2rem 0.5rem',
                                borderRadius: 6,
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}>
                                {customLogoUrl ? (
                                    <img src={customLogoUrl} alt="Logo" style={{ height: 14, objectFit: 'contain' }} />
                                ) : (
                                    <>
                                        <Sparkles size={10} />
                                        <span>Brand Mark</span>
                                    </>
                                )}
                            </div>

                            <div style={{
                                fontSize: `${1.0 * (editorProps.fontSizeMultiplier || 1.0)}rem`,
                                fontWeight: 800,
                                lineHeight: 1.2,
                                fontFamily: brandKit.font,
                                maxWidth: '90%'
                            }}>
                                {selectedCopy ? selectedCopy.headline : 'The future of Generative Branding is deterministic.'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem', maxWidth: '90%' }}>
                                {selectedCopy ? selectedCopy.subtext : 'Sustainable energy for the modern grind.'}
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: 10,
                                left: 12,
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                color: 'var(--primary)',
                                background: 'rgba(15, 23, 42, 0.85)',
                                padding: '0.15rem 0.4rem',
                                borderRadius: 4
                            }}>
                                {selectedFormat} • {selectedQuality} {includeCropMarks ? '• +3mm Crop' : ''}
                            </div>
                        </div>

                        <button
                            className="btn btn-secondary"
                            style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
                            onClick={() => handleSingleExport(preset.title)}
                        >
                            <Download size={16} />
                            <span>Download ({selectedFormat})</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
