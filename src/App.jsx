import { useMemo } from 'react';
import { useGameStore } from './hooks/useGameState.js';
import { HomeScreen } from './components/screens/HomeScreen.jsx';
import { ScenarioSelect } from './components/screens/ScenarioSelect.jsx';
import { LobbyScreen } from './components/screens/LobbyScreen.jsx';
import { GameCanvas } from './components/game/GameCanvas.jsx';
import { GameOverScreen } from './components/screens/GameOverScreen.jsx';

export default function App() {
  // Use individual selectors so App only re-renders when screen or session change,
  // NOT when in-game UI state (timeLeft, myHand, etc.) updates every 100ms.
  const screen = useGameStore((s) => s.screen);
  const session = useGameStore((s) => s.session);

  const matchConfig = useMemo(
    () =>
      session
        ? {
            scenarioId: session.scenarioId,
            hostFaction: session.hostFaction,
            guestFaction: session.guestFaction,
            code: session.code,
          }
        : null,
    [session],
  );

  return (
    <div className="w-screen h-screen overflow-hidden">
      {screen === 'home' && <HomeScreen />}
      {screen === 'scenario-select' && <ScenarioSelect />}
      {screen === 'lobby' && <LobbyScreen />}
      {screen === 'game' && matchConfig && <GameCanvas matchConfig={matchConfig} />}
      {screen === 'game-over' && <GameOverScreen />}
    </div>
  );
}
