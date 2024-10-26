// client/config/gameConfig.js
export const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    POPULATION_SIZE: 50,
    MUTATION_RATE: 0.1,
    ELITE_PERCENTAGE: 0.1,
    TOURNAMENT_SIZE: 5,
    RESOURCE_COUNT: 20,
    PREDATOR_COUNT: 3,
    ENERGY_DECAY_RATE: 0.1,
    MIN_REPRODUCTION_ENERGY: 50,
    RESOURCE_VALUE: {
      FOOD: 30,
      WATER: 20
    },
    TRAIT_BOUNDS: {
      SPEED: { MIN: 0.5, MAX: 5 },
      SIZE: { MIN: 0.5, MAX: 4 },
      SENSE_RANGE: { MIN: 10, MAX: 100 },
      METABOLISM: { MIN: 0.1, MAX: 1 }
    },
    POWER_TYPES: {
      HEROES: ['SPEED', 'STRENGTH', 'FLIGHT', 'ENERGY_BLAST', 'HEALING'],
      VILLAINS: ['DARKNESS', 'POISON', 'SHAPESHIFTING', 'MIND_CONTROL', 'TELEKINESIS']
    },
    RESOURCES: {
      POWER_CRYSTALS: { value: 50, color: '#00ff88' },
      HEALTH_PACKS: { value: 30, color: '#ff4444' },
      ENERGY_CORES: { value: 40, color: '#4444ff' }
    }
  };