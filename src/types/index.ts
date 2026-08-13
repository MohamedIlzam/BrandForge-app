export interface BrandColor {
    name: string;
    hex: string;
    role: 'Primary' | 'Secondary' | 'Accent' | 'Neutral';
}

export interface BrandKit {
    name: string;
    font: string;
    colors: BrandColor[];
    consistencyScore: number;
    warningsCount: number;
    logoUrl?: string;
}

export interface DesignProject {
    id: string;
    title: string;
    category: 'Social Media' | 'Print' | 'Presentation';
    updatedAt: string;
    thumbnailUrl: string;
}

export interface CreativeCopyItem {
    id: string;
    headline: string;
    subtext: string;
    tags: string[];
}

export interface EditorProperties {
    layoutEngine: 'Deterministic' | 'Adaptive' | 'Manual';
    clearSpaceMargin: number; // percentage e.g. 15
    focalPointRule: boolean;
    typographyScaling: 'Strict' | 'Fluid';
    brandMarkPlacement: 'Top-Right' | 'Top-Left' | 'Center' | 'Bottom-Right' | 'Bottom-Left';
    textAlign: 'left' | 'center' | 'right';
    fontSizeMultiplier: number;
}

export interface ExportPreset {
    id: string;
    title: string;
    dimensions: string;
    format: 'PNG' | 'SVG' | 'PDF';
    quality: 'High (300 DPI)' | 'Web (72 DPI)';
}
