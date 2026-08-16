import React, { useState, useRef, useEffect } from 'react';
import { useBrandContext } from '../context/BrandContext';
import { ChatMessage, PresetPrompt } from '../types/chat';
import { calculateSplitPercentage } from '../utils/resizer';
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
    Plus,
    Send,
    Bot,
    User,
    GripVertical,
    RotateCcw,
    CornerDownLeft,
    Paperclip,
    ChevronDown,
    Zap,
    Maximize2
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

    // Resizer state (chat window defaults to min width ~32%)
    const [leftWidthPercent, setLeftWidthPercent] = useState<number>(68);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Chat state
    const [chatInput, setChatInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const presetPrompts = [
        { label: '⚡ Artisanal Coffee', text: 'Sustainable artisan cold brew for high-performing remote professionals and coffee purists.' },
        { label: '🌿 Eco Luxury', text: 'Zero-waste luxury skincare crafted with organic botanical extracts for conscious consumers.' },
        { label: '🚀 Tech SaaS', text: 'AI-driven workflow platform designed for high-velocity software engineering teams.' },
        { label: '🎨 Minimalist Studio', text: 'Swiss functional modernist design agency creating timeless brand identities.' }
    ];

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome-msg',
            sender: 'assistant',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: "Hello! I'm BrandForge AI, your generative brand strategist. Describe your vision, select a preset below, or adjust tone alignment to generate slogans and live poster collateral.",
            copyOptions: creativeCopies,
            isInitial: true
        }
    ]);

    // Resizer Drag Listener
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const newWidth = calculateSplitPercentage(e.clientX, rect.left, rect.width, 25, 72);
            setLeftWidthPercent(newWidth);
        };

        const handleMouseUp = () => {
            if (isDragging) setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = (textToSend?: string) => {
        const prompt = textToSend !== undefined ? textToSend : chatInput;
        if (!prompt.trim() || isGenerating) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: prompt
        };

        setMessages(prev => [...prev, userMsg]);
        setChatInput('');
        setBrandVisionPrompt(prompt);
        setIsGenerating(true);

        setTimeout(() => {
            generateAICopy(prompt);
            setIsGenerating(false);
            setHasGenerated(true);

            const assistantMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: `I've analyzed your vision prompt for **"${brandName}"** targeting **"${targetAudience}"** with an **#${selectedTone}** tone. Here are custom headline and copy options generated for your live collateral:`,
                copyOptions: creativeCopies
            };

            setMessages(prev => [...prev, assistantMsg]);
            setTimeout(scrollToBottom, 100);
        }, 700);
    };

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleResetChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                sender: 'assistant',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: "Chat history cleared. Select a preset or enter a new brand vision prompt to begin generating.",
                isInitial: true
            }
        ]);
    };

    const selectedCopy = creativeCopies.find(c => c.id === selectedCopyId) || creativeCopies[0];

    return (
        <div>
            {/* Page Header */}
            <div className="page-header" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h1 className="page-title" style={{ margin: 0 }}>AI Generation Workspace</h1>

                    {/* Logo & Core Identity Buttons on the left */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsLogoModalOpen(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.45rem 0.85rem',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid var(--border-light)',
                                backgroundColor: '#ffffff',
                                boxShadow: 'var(--shadow-sm)',
                                cursor: 'pointer'
                            }}
                        >
                            <ImageIcon size={16} color="var(--primary)" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>Logo</span>
                            <span className="brand-badge" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                                {logoList.length} LOGOS
                            </span>
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsCoreIdentityOpen(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.45rem 0.85rem',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid var(--border-light)',
                                backgroundColor: '#ffffff',
                                boxShadow: 'var(--shadow-sm)',
                                cursor: 'pointer'
                            }}
                        >
                            <Fingerprint size={16} color="var(--primary)" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>Core Identity</span>
                            <span className="brand-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                                <BadgeCheck size={10} /> ACTIVE
                            </span>
                        </button>
                    </div>
                </div>
                <p className="page-subtitle" style={{ margin: 0 }}>Translate brand vision into deterministic slogans, typography pairings, and generative collateral.</p>
            </div>

            {/* Main Resizable Split Workspace */}
            <div className="ai-workspace-split-container" ref={containerRef}>
                {/* Left Pane: Live Concept Preview & Rationale */}
                <div className="ai-preview-panel" style={{ width: `${leftWidthPercent}%` }}>
                    <div className="card" style={{ background: '#0f172a', color: '#ffffff' }}>
                        <div className="card-header" style={{ borderColor: 'var(--border-dark)', marginBottom: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={18} color="var(--primary)" />
                                <span className="card-title" style={{ color: '#ffffff', fontSize: '1rem' }}>Live Concept Preview</span>
                            </div>
                            <span style={{ fontSize: '0.725rem', color: 'var(--text-sidebar)' }}>Plus Jakarta Sans</span>
                        </div>

                        {/* Canvas Poster Mockup */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                            border: '1px solid var(--border-dark)',
                            borderRadius: 'var(--border-radius-md)',
                            padding: '2.25rem 1.5rem',
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
                                fontSize: '0.68rem',
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

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem', color: '#ffffff' }}>
                                {selectedCopy ? selectedCopy.headline : 'Brewing Better Mornings.'}
                            </h2>

                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '88%', margin: '0 auto' }}>
                                {selectedCopy ? selectedCopy.subtext : 'Sustainable energy for the modern grind.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '0.6rem 0.85rem', fontSize: '0.85rem' }}
                                onClick={() => setActiveView('editor')}
                            >
                                <Sliders size={15} />
                                <span>Open in Editor</span>
                            </button>
                            <button
                                className="btn btn-secondary"
                                style={{ background: 'transparent', borderColor: 'var(--border-dark)', color: '#ffffff', padding: '0.6rem' }}
                                onClick={() => setActiveView('export')}
                            >
                                <Download size={15} />
                            </button>
                        </div>
                    </div>

                    {/* AI Recommendation Strategy & Rationale Card */}
                    {hasGenerated && (
                        <div className="card" style={{
                            border: '1px solid rgba(20, 184, 156, 0.25)',
                            borderTop: '2px solid var(--primary)',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 250, 0.6) 100%)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '16px',
                            padding: '1.1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <BrainCircuit size={18} color="var(--primary)" />
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>AI Rationale & Alignment</h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                                    <Target size={14} color="var(--primary)" />
                                    <span>Tone: <strong style={{ color: 'var(--text-main)' }}>#{selectedTone}</strong></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                                    <Palette size={14} color="var(--primary)" />
                                    <span>Palette: <strong style={{ color: 'var(--text-main)' }}>{brandKit?.name || 'Teal & Slate'}</strong></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                                    <ShieldCheck size={14} color="#10b981" />
                                    <span>Rules Enforced: Clean art, zero AI text clutter</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Resizer Handle */}
                <div
                    className={`ai-workspace-resizer ${isDragging ? 'is-dragging' : ''}`}
                    onMouseDown={handleMouseDown}
                    title="Drag left/right to resize panels"
                >
                    <div className="resizer-bar" />
                    <GripVertical size={14} className="resizer-icon" />
                </div>

                {/* Right Pane: ChatGPT / Claude Style Chat Space */}
                <div className="ai-chat-panel" style={{ width: `calc(${100 - leftWidthPercent}% - 16px)` }}>
                    {/* Chat Header */}
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div className="chat-avatar assistant" style={{ width: 32, height: 32 }}>
                                <Wand2 size={16} />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                        BrandForge AI
                                    </h3>
                                    <span className="brand-badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                                        ENGINE v2
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Claude 3.5 & GPT-4o Hybrid • Generative Strategy
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={handleResetChat}
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderRadius: 8 }}
                                title="Clear conversation"
                            >
                                <RotateCcw size={13} />
                                <span>Reset Chat</span>
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages History */}
                    <div className="chat-messages-container">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                                <div className={`chat-avatar ${msg.sender}`}>
                                    {msg.sender === 'assistant' ? <Wand2 size={16} /> : <User size={16} />}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '100%' }}>
                                    <div className="chat-bubble">
                                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>

                                        {/* Initial Welcome Quick Options */}
                                        {msg.isInitial && (
                                            <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                                                    Quick Vision Presets
                                                </label>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                    {presetPrompts.map((preset, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSend(preset.text)}
                                                            style={{
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                                padding: '0.4rem 0.75rem',
                                                                borderRadius: '8px',
                                                                border: '1px solid var(--border-light)',
                                                                backgroundColor: '#ffffff',
                                                                color: 'var(--text-main)',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.35rem'
                                                            }}
                                                        >
                                                            <span>{preset.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Generated Copy Options Cards attached to Assistant Messages */}
                                    {msg.copyOptions && msg.copyOptions.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                            {msg.copyOptions.map((item) => {
                                                const isSelected = selectedCopyId === item.id;
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => setSelectedCopyId(item.id)}
                                                        style={{
                                                            padding: '0.85rem 1rem',
                                                            borderRadius: '12px',
                                                            border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                                                            background: isSelected ? 'var(--primary-glow)' : '#ffffff',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            boxShadow: isSelected ? '0 4px 12px rgba(20, 184, 156, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                                                {item.headline}
                                                            </h4>
                                                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    style={{ padding: '0.2rem 0.45rem', fontSize: '0.7rem' }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCopy(item.id, `${item.headline} - ${item.subtext}`);
                                                                    }}
                                                                >
                                                                    {copiedId === item.id ? <Check size={13} color="var(--primary)" /> : <Copy size={13} />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.3rem', marginBottom: '0.5rem' }}>
                                                            {item.subtext}
                                                        </p>

                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                                {item.tags.map((tag: string, i: number) => (
                                                                    <span key={i} style={{
                                                                        fontSize: '0.68rem',
                                                                        fontWeight: 600,
                                                                        background: 'var(--bg-app)',
                                                                        padding: '0.12rem 0.4rem',
                                                                        borderRadius: 10,
                                                                        color: 'var(--text-muted)'
                                                                    }}>
                                                                        #{tag}
                                                                    </span>
                                                                ))}
                                                            </div>

                                                            {isSelected ? (
                                                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                                    <Check size={12} /> Active in Preview
                                                                </span>
                                                            ) : (
                                                                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                                                    Click to preview
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', paddingLeft: 4 }}>
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Generating State */}
                        {isGenerating && (
                            <div className="chat-message-row assistant">
                                <div className="chat-avatar assistant">
                                    <RefreshCw size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                                </div>
                                <div className="chat-bubble" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                        Synthesizing slogans & generating live artwork...
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* ChatGPT / Claude Style Chat Input Bar */}
                    <div className="chat-input-wrapper">
                        {/* Inline Controls (Tone & Logo selection) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                            {/* Tone Alignment Pills */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)' }}>Tone:</span>
                                {['Bold & Direct', 'Clean & Minimal', 'Inspiring'].map((tone) => (
                                    <button
                                        key={tone}
                                        onClick={() => setSelectedTone(tone)}
                                        style={{
                                            fontSize: '0.725rem',
                                            fontWeight: selectedTone === tone ? 700 : 500,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '12px',
                                            border: selectedTone === tone ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                                            backgroundColor: selectedTone === tone ? 'var(--primary-glow)' : 'var(--bg-app)',
                                            color: selectedTone === tone ? 'var(--primary-dark)' : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        {tone}
                                    </button>
                                ))}
                            </div>

                            {/* Active Logo Pill */}
                            <button
                                onClick={() => setIsLogoModalOpen(true)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    fontSize: '0.725rem',
                                    fontWeight: 600,
                                    padding: '0.2rem 0.55rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-light)',
                                    backgroundColor: '#ffffff',
                                    color: 'var(--text-main)',
                                    cursor: 'pointer'
                                }}
                            >
                                <ImageIcon size={12} color="var(--primary)" />
                                <span>Logo: {logoList.find(l => l.id === activeLogoId)?.name || 'Default'}</span>
                            </button>
                        </div>

                        {/* Input Box Container */}
                        <div className="chat-input-box">
                            <textarea
                                className="chat-textarea"
                                rows={2}
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Message BrandForge AI (e.g. 'Craft a high-energy campaign slogan for remote workers')..."
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem', paddingTop: '0.35rem', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <button
                                        onClick={() => setIsLogoModalOpen(true)}
                                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}
                                        title="Attach or select logo"
                                    >
                                        <Paperclip size={14} />
                                        <span>Attach Logo</span>
                                    </button>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                        Press <strong>Enter ↵</strong> to send
                                    </span>
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={!chatInput.trim() || isGenerating}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 10,
                                            border: 'none',
                                            backgroundColor: chatInput.trim() ? 'var(--primary)' : '#e2e8f0',
                                            color: '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s ease',
                                            boxShadow: chatInput.trim() ? '0 2px 8px rgba(20, 184, 156, 0.3)' : 'none'
                                        }}
                                    >
                                        <Send size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
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

            {/* Add & Manage Logo Modal */}
            {isLogoModalOpen && (
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
