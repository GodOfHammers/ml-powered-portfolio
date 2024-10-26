// client/utils/heroCreation.js
import { GAME_CONFIG } from '../config/gameConfig';

export const createSuperhero = () => ({
  position: {
    x: Math.random() * GAME_CONFIG.CANVAS_WIDTH,
    y: Math.random() * GAME_CONFIG.CANVAS_HEIGHT
  },
  velocity: {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2
  },
  type: Math.random() > 0.5 ? 'HERO' : 'VILLAIN',
  powers: {
    primaryPower: Math.random() > 0.5 ? 
      GAME_CONFIG.POWER_TYPES.HEROES[Math.floor(Math.random() * GAME_CONFIG.POWER_TYPES.HEROES.length)] :
      GAME_CONFIG.POWER_TYPES.VILLAINS[Math.floor(Math.random() * GAME_CONFIG.POWER_TYPES.VILLAINS.length)],
    powerLevel: Math.random() * 100,
    speed: Math.random() * 3 + 1,
    strength: Math.random() * 100,
    health: 100,
    energy: 100
  },
  appearance: {
    size: Math.random() * 2 + 1,
    color: Math.random() > 0.5 ? 
      `hsl(${Math.random() * 60 + 180}, 80%, 60%)` :
      `hsl(${Math.random() * 60 + 300}, 70%, 30%)`,
    glowEffect: true,
    cape: Math.random() > 0.7
  },
  stats: {
    victories: 0,
    defeats: 0,
    powerUpsCollected: 0,
    civiliansRescued: 0
  },
  fitness: 0,
  age: 0,
  generation: 1,
  id: Math.random().toString(36).substr(2, 9)
});