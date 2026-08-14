import React, { createContext, useContext, useState } from 'react';
import { BrandKit, DesignProject, CreativeCopyItem, EditorProperties, ExportPreset, BrandKnowledge, GenerationUsage, LogoOption } from '../types';

export type ViewMode = 'dashboard' | 'ai_workspace' | 'editor' | 'export';

interface BrandContextType {
    activeView: ViewMode;
    setActiveView: (view: ViewMode) => void;
    brandKit: BrandKit;
    brandKitsList: BrandKit[];
    activeBrandKitId: string;
    selectBrandKit: (id: string) => void;
    createBrandKit: (name: string, font: string, primaryColor: string) => void;
    brandKnowledge: BrandKnowledge;
    updateBrandKnowledge: (fields: Partial<BrandKnowledge>) => void;
    generationUsage: GenerationUsage;
    customLogoUrl: string | null;
    setCustomLogoUrl: (url: string | null) => void;
    logoList: LogoOption[];
    activeLogoId: string;
    selectLogo: (id: string) => void;
    addLogo: (name: string, url: string) => void;
    projects: DesignProject[];
    creativeCopies: CreativeCopyItem[];
    brandVisionPrompt: string;
    setBrandVisionPrompt: (prompt: string) => void;
    editorProps: EditorProperties;
    setEditorProps: React.Dispatch<React.SetStateAction<EditorProperties>>;
    exportPresets: ExportPreset[];
    generateAICopy: (prompt: string) => void;
}

const initialBrandKits: BrandKit[] = [
    {
        id: 'kit-1',
        name: 'Modern Studio (Default)',
        font: 'Plus Jakarta Sans',
        colors: [
            { name: 'Teal Primary', hex: '#14b89c', role: 'Primary' },
            { name: 'Slate Dark', hex: '#0f172a', role: 'Secondary' },
            { name: 'Light Surface', hex: '#f8fafc', role: 'Neutral' },
            { name: 'Emerald Glow', hex: '#10b981', role: 'Accent' }
        ],
        consistencyScore: 88,
        warningsCount: 3,
        industry: 'Generative Tech'
    },
    {
        id: 'kit-2',
        name: 'Nexus Tech (Pro)',
        font: 'Inter',
        colors: [
            { name: 'Cobalt Blue', hex: '#2563eb', role: 'Primary' },
            { name: 'Deep Midnight', hex: '#020617', role: 'Secondary' },
            { name: 'Ice White', hex: '#ffffff', role: 'Neutral' },
            { name: 'Electric Cyan', hex: '#06b6d4', role: 'Accent' }
        ],
        consistencyScore: 94,
        warningsCount: 1,
        isPro: true,
        industry: 'SaaS Platform'
    },
    {
        id: 'kit-3',
        name: 'Luxe Botanicals (Pro)',
        font: 'Outfit',
        colors: [
            { name: 'Forest Amber', hex: '#d97706', role: 'Primary' },
            { name: 'Deep Spruce', hex: '#064e3b', role: 'Secondary' },
            { name: 'Warm Cream', hex: '#fef3c7', role: 'Neutral' },
            { name: 'Rose Bloom', hex: '#e11d48', role: 'Accent' }
        ],
        consistencyScore: 91,
        warningsCount: 2,
        isPro: true,
        industry: 'Artisanal & Luxury'
    }
];

const initialBrandKnowledge: BrandKnowledge = {
    visionPrompt: 'Sustainable artisanal coffee brand focused on productivity and organic purity.',
    targetAudience: 'Urban professionals, remote developers, & coffee enthusiasts',
    toneTags: ['Energetic', 'Modernist', 'Organic', 'Premium'],
    brandValues: 'Eco-friendly sourcing, precision roasting, minimal waste',
    industryCategory: 'Food & Beverage / E-Commerce'
};

const initialGenerationUsage: GenerationUsage = {
    used: 14,
    total: 20,
    isPro: true,
    tierName: 'Pro Member'
};

const initialProjects: DesignProject[] = [
    {
        id: 'proj-1',
        title: 'Q3 Summit Post',
        category: 'Social Media',
        updatedAt: 'Edited 2h ago',
        thumbnailUrl: '/posters/q3_summit.png'
    },
    {
        id: 'proj-2',
        title: 'Agency Overview Flyer',
        category: 'Print',
        updatedAt: 'Edited 1d ago',
        thumbnailUrl: '/posters/agency_overview.png'
    },
    {
        id: 'proj-3',
        title: 'Pitch Deck Template',
        category: 'Presentation',
        updatedAt: 'Edited 3d ago',
        thumbnailUrl: '/posters/pitch_deck.png',
        isPro: true
    }
];

const initialCopies: CreativeCopyItem[] = [
    {
        id: 'copy-1',
        headline: 'Brewing Better Mornings.',
        subtext: 'Sustainable energy for the modern grind.',
        tags: ['Energetic', 'Modern', 'Clean']
    },
    {
        id: 'copy-2',
        headline: 'Clarity in Every Cup.',
        subtext: 'Pure, intentional, driven.',
        tags: ['Minimal', 'Direct', 'Premium']
    },
    {
        id: 'copy-3',
        headline: 'Precision Craft, Daily Ritual.',
        subtext: 'Elevate your performance from sunrise.',
        tags: ['Bold', 'Inspiring']
    }
];

const initialEditorProps: EditorProperties = {
    layoutEngine: 'Deterministic',
    clearSpaceMargin: 15,
    focalPointRule: true,
    typographyScaling: 'Strict',
    brandMarkPlacement: 'Top-Right',
    textAlign: 'center',
    fontSizeMultiplier: 1.0
};

const initialExportPresets: ExportPreset[] = [
    {
        id: 'exp-1',
        title: 'Instagram Post',
        dimensions: '1080 x 1080 px',
        format: 'PNG',
        quality: 'High (300 DPI)'
    },
    {
        id: 'exp-2',
        title: 'A4 Flyer',
        dimensions: '210 x 297 mm',
        format: 'PDF',
        quality: 'High (300 DPI)',
        isProOnly: true
    },
    {
        id: 'exp-3',
        title: 'Digital Poster',
        dimensions: '1080 x 1920 px',
        format: 'PNG',
        quality: 'High (300 DPI)'
    }
];

const initialLogoList: LogoOption[] = [
    {
        id: 'logo-default',
        name: 'BrandForge Monogram',
        url: null,
        isDefault: true,
        category: 'Default Vector'
    },
    {
        id: 'logo-minimal',
        name: 'Minimal Crest (Teal)',
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2314b89c"/><text x="50" y="62" font-size="36" font-weight="900" fill="white" text-anchor="middle" font-family="sans-serif">BF</text></svg>',
        category: 'Minimal'
    },
    {
        id: 'logo-badge',
        name: 'Dark Studio Badge',
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100"><rect width="90" height="90" x="5" y="5" rx="20" fill="%230f172a"/><text x="50" y="62" font-size="36" font-weight="900" fill="%2314b89c" text-anchor="middle" font-family="sans-serif">BF</text></svg>',
        category: 'Studio'
    }
];

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeView, setActiveView] = useState<ViewMode>('dashboard');
    const [brandKitsList, setBrandKitsList] = useState<BrandKit[]>(initialBrandKits);
    const [activeBrandKitId, setActiveBrandKitId] = useState<string>('kit-1');
    const [brandKnowledge, setBrandKnowledge] = useState<BrandKnowledge>(initialBrandKnowledge);
    const [generationUsage] = useState<GenerationUsage>(initialGenerationUsage);
    const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
    const [logoList, setLogoList] = useState<LogoOption[]>(initialLogoList);
    const [activeLogoId, setActiveLogoId] = useState<string>('logo-default');
    const [projects] = useState<DesignProject[]>(initialProjects);
    const [creativeCopies, setCreativeCopies] = useState<CreativeCopyItem[]>(initialCopies);
    const [brandVisionPrompt, setBrandVisionPromptState] = useState<string>(initialBrandKnowledge.visionPrompt);
    const [editorProps, setEditorProps] = useState<EditorProperties>(initialEditorProps);
    const [exportPresets] = useState<ExportPreset[]>(initialExportPresets);

    const selectLogo = (id: string) => {
        const found = logoList.find(l => l.id === id);
        if (found) {
            setActiveLogoId(id);
            setCustomLogoUrl(found.url);
        }
    };

    const addLogo = (name: string, url: string) => {
        const newLogo: LogoOption = {
            id: `logo-${Date.now()}`,
            name: name || `Custom Logo ${logoList.length + 1}`,
            url,
            category: 'User Upload'
        };
        setLogoList(prev => [newLogo, ...prev]);
        setActiveLogoId(newLogo.id);
        setCustomLogoUrl(url);
    };

    // Active Brand Kit derivation
    const activeKit = brandKitsList.find(k => k.id === activeBrandKitId) || brandKitsList[0];

    const selectBrandKit = (id: string) => {
        const found = brandKitsList.find(k => k.id === id);
        if (found) {
            setActiveBrandKitId(id);
        }
    };

    const createBrandKit = (name: string, font: string, primaryColor: string) => {
        const newKit: BrandKit = {
            id: `kit-${Date.now()}`,
            name,
            font: font || 'Inter',
            colors: [
                { name: 'Primary Color', hex: primaryColor || '#14b89c', role: 'Primary' },
                { name: 'Dark Surface', hex: '#0f172a', role: 'Secondary' },
                { name: 'Light Surface', hex: '#f8fafc', role: 'Neutral' }
            ],
            consistencyScore: 95,
            warningsCount: 0,
            isPro: true
        };
        setBrandKitsList(prev => [...prev, newKit]);
        setActiveBrandKitId(newKit.id);
    };

    const updateBrandKnowledge = (fields: Partial<BrandKnowledge>) => {
        setBrandKnowledge(prev => {
            const updated = { ...prev, ...fields };
            if (fields.visionPrompt) {
                setBrandVisionPromptState(fields.visionPrompt);
            }
            return updated;
        });
    };

    const setBrandVisionPrompt = (prompt: string) => {
        setBrandVisionPromptState(prompt);
        setBrandKnowledge(prev => ({ ...prev, visionPrompt: prompt }));
    };

    const generateAICopy = (promptText: string) => {
        if (!promptText.trim()) return;
        const newItems: CreativeCopyItem[] = [
            {
                id: `copy-${Date.now()}-1`,
                headline: `Crafted for ${promptText.split(' ')[0] || 'Excellence'}.`,
                subtext: 'Tailored branding aligned with your vision.',
                tags: ['AI Generated', 'Fresh']
            },
            {
                id: `copy-${Date.now()}-2`,
                headline: 'Deterministic Elegance.',
                subtext: 'Smart design components scaled effortlessly.',
                tags: ['Modernist', 'Precision']
            },
            ...creativeCopies
        ];
        setCreativeCopies(newItems);
    };

    return (
        <BrandContext.Provider value={{
            activeView,
            setActiveView,
            brandKit: activeKit,
            brandKitsList,
            activeBrandKitId,
            selectBrandKit,
            createBrandKit,
            brandKnowledge,
            updateBrandKnowledge,
            generationUsage,
            customLogoUrl,
            setCustomLogoUrl,
            logoList,
            activeLogoId,
            selectLogo,
            addLogo,
            projects,
            creativeCopies,
            brandVisionPrompt,
            setBrandVisionPrompt,
            editorProps,
            setEditorProps,
            exportPresets,
            generateAICopy
        }}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrandContext = () => {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error('useBrandContext must be used within a BrandProvider');
    }
    return context;
};

