import { CreativeCopy } from './index';

export type SenderType = 'assistant' | 'user';

export interface ChatMessage {
    id: string;
    sender: SenderType;
    timestamp: string;
    text?: string;
    copyOptions?: CreativeCopy[];
    isInitial?: boolean;
}

export interface PresetPrompt {
    label: string;
    text: string;
}

export interface ResizerState {
    leftWidthPercent: number;
    isDragging: boolean;
}
