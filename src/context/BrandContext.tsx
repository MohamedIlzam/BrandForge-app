import React, { createContext, useContext, useState } from 'react';
import { BrandKit, DesignProject, CreativeCopyItem, EditorProperties, ExportPreset } from '../types';

export type ViewMode = 'dashboard' | 'ai_workspace' | 'editor' | 'export';

interface BrandContextType {
    activeView: ViewMode;
    setActiveView: (view: ViewMode) => void;
    brandKit: BrandKit;
    customLogoUrl: string | null;
    setCustomLogoUrl: (url: string | null) => void;
    projects: DesignProject[];
    creativeCopies: CreativeCopyItem[];
    brandVisionPrompt: string;
    setBrandVisionPrompt: (prompt: string) => void;
    editorProps: EditorProperties;
    setEditorProps: React.Dispatch<React.SetStateAction<EditorProperties>>;
    exportPresets: ExportPreset[];
    generateAICopy: (prompt: string) => void;
}

const initialBrandKit: BrandKit = {
    name: 'Modern Studio',
    font: 'Plus Jakarta Sans',
    colors: [
        { name: 'Teal Primary', hex: '#14b89c', role: 'Primary' },
        { name: 'Slate Dark', hex: '#0f172a', role: 'Secondary' },
        { name: 'Light Surface', hex: '#f8fafc', role: 'Neutral' },
        { name: 'Emerald Glow', hex: '#10b981', role: 'Accent' }
    ],
    consistencyScore: 88,
    warningsCount: 3
};

const initialProjects: DesignProject[] = [
    {
        id: 'proj-1',
        title: 'Q3 Summit Post',
        category: 'Social Media',
        updatedAt: 'Edited 2h ago',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'proj-2',
        title: 'Agency Overview Flyer',
        category: 'Print',
        updatedAt: 'Edited 1d ago',
        thumbnailUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'proj-3',
        title: 'Pitch Deck Template',
        category: 'Presentation',
        updatedAt: 'Edited 3d ago',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
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
        quality: 'High (300 DPI)'
    },
    {
        id: 'exp-3',
        title: 'Digital Poster',
        dimensions: '1080 x 1920 px',
        format: 'PNG',
        quality: 'High (300 DPI)'
    }
];

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeView, setActiveView] = useState<ViewMode>('dashboard');
    const [brandKit] = useState<BrandKit>(initialBrandKit);
    const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
    const [projects] = useState<DesignProject[]>(initialProjects);
    const [creativeCopies, setCreativeCopies] = useState<CreativeCopyItem[]>(initialCopies);
    const [brandVisionPrompt, setBrandVisionPrompt] = useState<string>('Sustainable artisanal coffee brand focused on productivity and organic purity.');
    const [editorProps, setEditorProps] = useState<EditorProperties>(initialEditorProps);
    const [exportPresets] = useState<ExportPreset[]>(initialExportPresets);

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
            brandKit,
            customLogoUrl,
            setCustomLogoUrl,
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
