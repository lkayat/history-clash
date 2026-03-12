import { useGameStore } from './hooks/useGameState.js';
import { HomeScreen } from './components/screens/HomeScreen.jsx';
import { ScenarioSelect } from './components/screens/ScenarioSelect.jsx';
import { LobbyScreen } from './components/screens/LobbyScreen.jsx';
import { GameCanvas } from './components/game/GameCanvas.jsx';
import { GameOverScreen } from './components/screens/GameOverScreen.jsx';

export default function App() {
  const { screen, session, setScreen } = useGameStore();

  const matchConfig = session
    ? {
        scenarioId: session.scenarioId,
        hostFaction: session.hostFaction,
        guestFaction: session.guestFaction,
        code: session.code,
      }
    : null;

  const handleMatchStart = () => setScreen('game');

  return (
    <div className="w-screen h-screen overflow-hidden">
      {screen === 'home' && <HomeScreen />}
      {screen === 'scenario-select' && <ScenarioSelect />}
      {screen === 'lobby' && <LobbyScreen onMatchStart={handleMatchStart} />}
      {screen === 'game' && matchConfig && <GameCanvas matchConfig={matchConfig} />}
      {screen === 'game-over' && <GameOverScreen />}
    </div>
  );
}
