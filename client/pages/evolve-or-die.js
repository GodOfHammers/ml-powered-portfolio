import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiInfo, FiSettings, FiPause, FiRefreshCw } from 'react-icons/fi';
import GameRenderer from '../components/GameRenderer';
import { useGameLoop } from '../hooks/useGameLoop';
import { GAME_CONFIG } from '../config/gameConfig';
import { createSuperhero } from '../utils/heroCreation';

export default function EvolveOrDie() {
  const [gameState, setGameState] = useState({
    generation: 1,
    population: [],
    environment: null,
    gameStarted: false,
    paused: false,
    showTutorial: false,
    resources: [],
    predators: [], // Add this line
    statistics: {
      averageFitness: 0,
      bestFitness: 0,
      survivalRate: 0,
      averageLifespan: 0
    }
  });

  // Initialize population
  const initializePopulation = useCallback(() => {
    return Array.from({ length: GAME_CONFIG.POPULATION_SIZE }, createSuperhero);
  }, []);

  // Generate resources
  const generateResources = useCallback(() => {
    return Array.from({ length: GAME_CONFIG.RESOURCE_COUNT }, () => ({
      position: {
        x: Math.random() * GAME_CONFIG.CANVAS_WIDTH,
        y: Math.random() * GAME_CONFIG.CANVAS_HEIGHT
      },
      value: Math.random() * 30 + 20,
      size: Math.random() * 5 + 5,
      type: Object.keys(GAME_CONFIG.RESOURCES)[
        Math.floor(Math.random() * Object.keys(GAME_CONFIG.RESOURCES).length)
      ],
      id: Math.random().toString(36).substr(2, 9)
    }));
  }, []);

  // Generate predators
  const generatePredators = useCallback(() => {
    return Array.from({ length: GAME_CONFIG.PREDATOR_COUNT }, () => ({
      position: {
        x: Math.random() * GAME_CONFIG.CANVAS_WIDTH,
        y: Math.random() * GAME_CONFIG.CANVAS_HEIGHT
      },
      velocity: {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3
      },
      size: 15,
      speed: 2,
      senseRange: 100,
      color: '#ff0000',
      id: Math.random().toString(36).substr(2, 9)
    }));
  }, []);

  // Evolution functions
  const selectParent = useCallback((population) => {
    if (!population || population.length === 0) {
      return createSuperhero();
    }
    
    const tournamentSize = Math.min(GAME_CONFIG.TOURNAMENT_SIZE, population.length);
    const tournament = Array.from({ length: tournamentSize }, () => {
      const randomIndex = Math.floor(Math.random() * population.length);
      return population[randomIndex];
    });
    
    return tournament.reduce((best, current) => {
      if (!best || !current) return best || current;
      return (current?.fitness || 0) > (best?.fitness || 0) ? current : best;
    });
  }, []);

  // Crossover function
  const crossover = useCallback((parent1, parent2) => {
    if (!parent1 || !parent2) {
      return createSuperhero();
    }

    const child = createSuperhero();
    
    try {
      child.type = Math.random() > 0.5 ? parent1.type : parent2.type;
      child.powers = {
        ...child.powers,
        speed: (parent1.powers?.speed || 1 + parent2.powers?.speed || 1) / 2,
        strength: (parent1.powers?.strength || 50 + parent2.powers?.strength || 50) / 2,
        primaryPower: Math.random() > 0.5 ? parent1.powers?.primaryPower : parent2.powers?.primaryPower,
        powerLevel: (parent1.powers?.powerLevel || 50 + parent2.powers?.powerLevel || 50) / 2,
        health: 100,
        energy: 100
      };
      child.generation = Math.max(
        (parent1.generation || 1),
        (parent2.generation || 1)
      ) + 1;
    } catch (error) {
      console.error('Error in crossover:', error);
      return createSuperhero();
    }

    return child;
  }, []);

  // Mutation function
  const mutate = useCallback((hero) => {
    if (Math.random() < GAME_CONFIG.MUTATION_RATE) {
      const mutationFactor = 0.8 + Math.random() * 0.4;
      
      hero.powers = {
        ...hero.powers,
        speed: Math.max(0.5, Math.min(5, hero.powers.speed * mutationFactor)),
        strength: Math.max(1, Math.min(100, hero.powers.strength * mutationFactor)),
        powerLevel: Math.max(1, Math.min(100, hero.powers.powerLevel * mutationFactor))
      };

      // Small chance to completely change power type
      if (Math.random() < 0.1) {
        const powerTypes = hero.type === 'HERO' ? 
          GAME_CONFIG.POWER_TYPES.HEROES : 
          GAME_CONFIG.POWER_TYPES.VILLAINS;
        hero.powers.primaryPower = powerTypes[Math.floor(Math.random() * powerTypes.length)];
      }
    }
    return hero;
  }, []);

  // Evolution generation
  const evolveNextGeneration = useCallback(() => {
    setGameState(prev => {
      try {
        if (!prev.population || prev.population.length === 0) {
          const newPopulation = initializePopulation();
          return {
            ...prev,
            generation: 1,
            population: newPopulation,
            resources: generateResources()
          };
        }

        const sortedPopulation = [...prev.population]
          .filter(org => org && typeof org.fitness === 'number')
          .sort((a, b) => (b?.fitness || 0) - (a?.fitness || 0));

        const eliteCount = Math.max(
          1,
          Math.floor(GAME_CONFIG.POPULATION_SIZE * GAME_CONFIG.ELITE_PERCENTAGE)
        );

        const elites = sortedPopulation
          .slice(0, eliteCount)
          .map(elite => ({
            ...elite,
            powers: { ...elite.powers, energy: 100 },
            age: 0
          }));

        const newPopulation = [...elites];

        while (newPopulation.length < GAME_CONFIG.POPULATION_SIZE) {
          try {
            const parent1 = selectParent(sortedPopulation);
            const parent2 = selectParent(sortedPopulation);
            
            if (parent1 && parent2) {
              const child = crossover(parent1, parent2);
              const mutatedChild = mutate(child);
              if (mutatedChild) {
                newPopulation.push(mutatedChild);
              }
            }
          } catch (error) {
            console.error('Error in reproduction:', error);
            newPopulation.push(createSuperhero());
          }
        }

        const statistics = {
          averageFitness: newPopulation.reduce((sum, org) => sum + (org?.fitness || 0), 0) / newPopulation.length,
          bestFitness: Math.max(...newPopulation.map(org => org?.fitness || 0)),
          survivalRate: (elites.length / GAME_CONFIG.POPULATION_SIZE) * 100,
          averageLifespan: sortedPopulation.reduce((sum, org) => sum + (org?.age || 0), 0) / sortedPopulation.length
        };

        return {
          ...prev,
          generation: prev.generation + 1,
          population: newPopulation,
          resources: [...prev.resources, ...generateResources()].slice(0, GAME_CONFIG.RESOURCE_COUNT),
          statistics
        };
      } catch (error) {
        console.error('Error in evolution:', error);
        return prev;
      }
    });
  }, [initializePopulation, generateResources, selectParent, crossover, mutate]);

  // Game update function
  const updateGameState = useCallback(() => {
    if (gameState.paused) return;

    setGameState(prev => {
      const updatedPopulation = prev.population.map(hero => {
        const newX = hero.position.x + hero.velocity.x * hero.powers.speed;
        const newY = hero.position.y + hero.velocity.y * hero.powers.speed;

        const x = Math.max(0, Math.min(GAME_CONFIG.CANVAS_WIDTH, newX));
        const y = Math.max(0, Math.min(GAME_CONFIG.CANVAS_HEIGHT, newY));

        const vx = x === 0 || x === GAME_CONFIG.CANVAS_WIDTH ? -hero.velocity.x : hero.velocity.x;
        const vy = y === 0 || y === GAME_CONFIG.CANVAS_HEIGHT ? -hero.velocity.y : hero.velocity.y;

        const energyLoss = (hero.powers.speed * GAME_CONFIG.ENERGY_DECAY_RATE);
        const newEnergy = Math.max(0, hero.powers.energy - energyLoss);
        
        return {
          ...hero,
          position: { x, y },
          velocity: { x: vx, y: vy },
          powers: { ...hero.powers, energy: newEnergy },
          age: hero.age + 1,
          fitness: hero.fitness + (newEnergy > 0 ? 1 : 0)
        };
      });

      const livingPopulation = updatedPopulation.filter(org => org.powers.energy > 0);

      if (livingPopulation.length < GAME_CONFIG.POPULATION_SIZE / 2) {
        return {
          ...prev,
          population: livingPopulation
        };
      }

      return {
        ...prev,
        population: livingPopulation
      };
    });
  }, [gameState.paused]);

  // Initialize game loop
  useGameLoop(updateGameState, gameState.gameStarted && !gameState.paused);

  // Initialize game
  useEffect(() => {
    if (gameState.gameStarted && !gameState.environment) {
      setGameState(prev => ({
        ...prev,
        population: initializePopulation(),
        resources: generateResources(),
        predators: generatePredators(),
        environment: {
          width: GAME_CONFIG.CANVAS_WIDTH,
          height: GAME_CONFIG.CANVAS_HEIGHT,
          obstacles: []
        }
      }));
    }
  }, [gameState.gameStarted, gameState.environment, initializePopulation, generateResources, generatePredators]);


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-teal-400 mb-4">Evolve or Die</h1>
          <p className="text-xl text-gray-300">A Genetic Algorithm Strategy Game</p>
        </motion.div>

        {!gameState.gameStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-6"
          >
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}
              className="flex items-center gap-2 bg-teal-500 text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-teal-400 transition-colors"
            >
              <FiPlay />
              Start Game
            </button>
            <button
              onClick={() => setGameState(prev => ({ ...prev, showTutorial: true }))}
              className="flex items-center gap-2 bg-gray-800 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-700 transition-colors"
            >
              <FiInfo />
              How to Play
            </button>
          </motion.div>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-2">
                <div className="text-teal-400">Generation: {gameState.generation}</div>
                <div className="text-teal-400">Population: {gameState.population.length}</div>
              </div>
              <div className="space-y-2 text-right">
                <div className="text-teal-400">Average Fitness: {gameState.statistics.averageFitness.toFixed(2)}</div>
                <div className="text-teal-400">Survival Rate: {gameState.statistics.survivalRate.toFixed(1)}%</div>
              </div>
            </div>

            <GameRenderer
              width={GAME_CONFIG.CANVAS_WIDTH}
              height={GAME_CONFIG.CANVAS_HEIGHT}
              gameState={gameState}
            />

            <div className="flex justify-between mt-4">
              <div className="space-x-4">
                <button
                  onClick={() => setGameState(prev => ({ ...prev, paused: !prev.paused }))}
                  className="bg-teal-500 text-black px-6 py-2 rounded-full font-bold hover:bg-teal-400 transition-colors"
                >
                  {gameState.paused ? <FiPlay /> : <FiPause />}
                </button>
                <button
                  onClick={evolveNextGeneration}
                  className="bg-teal-500 text-black px-6 py-2 rounded-full font-bold hover:bg-teal-400 transition-colors"
                >
                  <FiRefreshCw /> Evolve Next Generation
                </button>
              </div>
              <button
                onClick={() => setGameState(prev => ({ ...prev, gameStarted: false }))}
                className="bg-gray-800 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-700 transition-colors"
              >
                Exit Game
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {gameState.showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 p-8 rounded-xl max-w-2xl relative"
              >
                <h2 className="text-2xl font-bold text-teal-400 mb-4">How to Play</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-teal-300">Basics:</h3>
                    <p>1. Watch your organisms evolve through generations</p>
                    <p>2. Each organism has unique traits that affect survival:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Speed: How fast they move</li>
                      <li>Size: Affects energy consumption and survival</li>
                      <li>Sense Range: How far they can detect resources and threats</li>
                      <li>Metabolism: Rate of energy consumption</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-teal-300">Survival Mechanics:</h3>
                    <p>3. Organisms must:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Collect resources (food and water) to survive</li>
                      <li>Avoid predators (red triangles)</li>
                      <li>Maintain energy levels above 0</li>
                      <li>Navigate obstacles in the environment</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-teal-300">Evolution:</h3>
                    <p>4. Natural selection occurs when:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Organisms with high fitness survive</li>
                      <li>Successful traits are passed to offspring</li>
                      <li>Random mutations introduce variety</li>
                      <li>Each generation adapts better to the environment</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-teal-300">Controls:</h3>
                    <p>5. You can:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Pause/Resume the simulation</li>
                      <li>Force evolution to the next generation</li>
                      <li>Monitor statistics and population health</li>
                      <li>Exit and restart the simulation</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setGameState(prev => ({ ...prev, showTutorial: false }))}
                    className="bg-teal-500 text-black px-6 py-2 rounded-full font-bold hover:bg-teal-400 transition-colors"
                  >
                    Got it!
                  </button>
                  <button
                    onClick={() => {
                      setGameState(prev => ({
                        ...prev,
                        showTutorial: false,
                        gameStarted: true
                      }));
                    }}
                    className="bg-teal-400 text-black px-6 py-2 rounded-full font-bold hover:bg-teal-300 transition-colors"
                  >
                    Start Playing
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Panel */}
        {gameState.gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-teal-400 font-bold mb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Best Fitness:</p>
                <p className="text-teal-300">{gameState.statistics?.bestFitness?.toFixed(2) || '0.00'}</p>
              </div>
              <div>
                <p className="text-gray-400">Avg Lifespan:</p>
                <p className="text-teal-300">{gameState.statistics?.averageLifespan?.toFixed(1) || '0.0'} cycles</p>
              </div>
              <div>
                <p className="text-gray-400">Resources:</p>
                <p className="text-teal-300">{gameState.resources?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-400">Predators:</p>
                <p className="text-teal-300">{gameState.predators?.length || 0}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Panel */}
        {gameState.gameStarted && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-4 left-4 bg-gray-900 p-4 rounded-lg shadow-lg"
          >
            <button
              onClick={() => setGameState(prev => ({ ...prev, showSettings: !prev.showSettings }))}
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
            >
              <FiSettings />
              <span>Settings</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}