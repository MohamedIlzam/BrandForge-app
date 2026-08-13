import React from 'react';
import { BrandProvider, useBrandContext } from './context/BrandContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './views/DashboardView';
import { AIGenerationWorkspaceView } from './views/AIGenerationWorkspaceView';
import { BrandingEditorView } from './views/BrandingEditorView';
import { ExportResizeView } from './views/ExportResizeView';
import './styles/theme.css';

interface MainContentProps {
    onToggleMobileMenu: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onToggleMobileMenu }) => {
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
            <Header onToggleMobileMenu={onToggleMobileMenu} />
            <main className="content-area">
                {renderView()}
            </main>
            <BottomNav />
        </div>
    );
};

export const App: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <BrandProvider>
            <div className="app-container">
                <Sidebar
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
                <MainContent
                    onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
                />
            </div>
        </BrandProvider>
    );
};

export default App;
