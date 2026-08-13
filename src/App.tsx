import React from 'react';
import { BrandProvider, useBrandContext } from './context/BrandContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { AIGenerationWorkspaceView } from './views/AIGenerationWorkspaceView';
import { BrandingEditorView } from './views/BrandingEditorView';
import { ExportResizeView } from './views/ExportResizeView';
import './styles/theme.css';

const MainContent: React.FC = () => {
    const { activeView } = useBrandContext();

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView />;
            case 'ai_workspace':
                return <AIGenerationWorkspaceView />;
            case 'editor':
                return <BrandingEditorView />;
            case 'export':
                return <ExportResizeView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="main-layout">
            <Header />
            <main className="content-area">
                {renderView()}
            </main>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <BrandProvider>
            <div className="app-container">
                <Sidebar />
                <MainContent />
            </div>
        </BrandProvider>
    );
};

export default App;
