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
    const { exportPresets } = useBrandContext();
    const [selectedFormat, setSelectedFormat] = useState<'PNG' | 'SVG' | 'PDF'>('PNG');
    const [selectedQuality, setSelectedQuality] = useState<'300 DPI' | '72 DPI'>('300 DPI');
    const [isExporting, setIsExporting] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);

    const handleBatchExport = () => {
        setIsExporting(true);
        setExportComplete(false);
        setTimeout(() => {
            setIsExporting(false);
            setExportComplete(true);
            setTimeout(() => setExportComplete(false), 3000);
        }, 1200);
    };

    const getPresetIcon = (title: string) => {
        if (title.includes('Instagram')) return <Instagram size={24} color="var(--primary)" />;
        if (title.includes('Flyer')) return <FileText size={24} color="var(--primary)" />;
        return <Tv size={24} color="var(--primary)" />;
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="page-title">Export & Resize</h1>
                    <p className="page-subtitle">Summer Campaign 2024 • Multi-format deterministic collateral rendering.</p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleBatchExport}
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <>
                            <Layers size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                            <span>Rendering All Formats...</span>
                        </>
                    ) : exportComplete ? (
                        <>
                            <CheckCircle2 size={18} />
                            <span>Assets Exported Successfully!</span>
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            <span>Export All 3 Formats</span>
                        </>
                    )}
                </button>
            </div>

            {/* Global Export Settings */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header">
                    <span className="card-title">Global Render Settings</span>
                    <span className="brand-badge">Vector Engine Active</span>
                </div>

                <div className="grid-2">
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                            File Format
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(['PNG', 'SVG', 'PDF'] as const).map((fmt) => (
                                <button
                                    key={fmt}
                                    className={`btn ${selectedFormat === fmt ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ flex: 1 }}
                                    onClick={() => setSelectedFormat(fmt)}
                                >
                                    {fmt}
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
                                    {q === '300 DPI' ? 'Print Ready (300 DPI)' : 'Web Screen (72 DPI)'}
                                </button>
                            ))}
                        </div>
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

                        {/* Poster Aspect Ratio Visualizer */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                            borderRadius: 'var(--border-radius-sm)',
                            height: 220,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '1rem 0',
                            padding: '1.5rem',
                            color: '#ffffff',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                marginBottom: '0.75rem',
                                color: '#ffffff'
                            }}>
                                BF
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 800 }}>Brewing Better Mornings.</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                Sustainable energy for the modern grind.
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 12,
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                color: 'var(--primary)',
                                background: 'rgba(15, 23, 42, 0.8)',
                                padding: '0.15rem 0.4rem',
                                borderRadius: 4
                            }}>
                                {selectedFormat} • {selectedQuality}
                            </div>
                        </div>

                        <button
                            className="btn btn-secondary"
                            style={{ marginTop: 'auto', width: '100%' }}
                            onClick={handleBatchExport}
                        >
                            <Download size={16} />
                            <span>Download {preset.title} ({selectedFormat})</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
