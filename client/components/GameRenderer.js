// client/components/GameRenderer.js
import { useEffect, useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

const GameRenderer = ({ gameState, width, height }) => {
  const canvasRef = useRef(null);

  const getPowerIcon = useCallback((power) => {
    const icons = {
      SPEED: '⚡',
      STRENGTH: '💪',
      FLIGHT: '🦅',
      ENERGY_BLAST: '🌟',
      HEALING: '💚',
      DARKNESS: '🌑',
      POISON: '☠️',
      SHAPESHIFTING: '🎭',
      MIND_CONTROL: '🧠',
      TELEKINESIS: '🌀'
    };
    return icons[power] || '❓';
  }, []);

  const drawResource = useCallback((ctx, resource) => {
    const { x, y } = resource.position;
    const { type, size } = resource;
    
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, GAME_CONFIG.RESOURCES[type].color);
    ctx.fillStyle = gradient;
    
    // Star shape for power-ups
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2;

    for(let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }, []);

  const drawSuperhero = useCallback((ctx, hero) => {
    const { x, y } = hero.position;
    const { color, size, glowEffect, cape } = hero.appearance;
    const { primaryPower, powerLevel, health, energy } = hero.powers;
  
    // Function to add alpha to the color
    const addAlpha = (color, alpha) => {
      if (color.startsWith('hsl(')) {
        return color.replace('hsl(', 'hsla(').replace(')', `, ${alpha})`);
      } else if (color.startsWith('rgb(')) {
        return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
      } else if (color.startsWith('#')) {
        // Assuming the hex color is in the format #RRGGBB
        const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
        return color + alphaHex;
      }
      // If the color format is not recognized, return it as is
      return color;
    };
  
    // Draw power aura
    if (glowEffect) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(x, y, size * 3, x, y, size * 15);
      gradient.addColorStop(0, addAlpha(color, 0.53)); // Fixed line
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.arc(x, y, size * 15, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw cape if present
    if (cape) {
      ctx.beginPath();
      ctx.moveTo(x - size * 5, y);
      ctx.quadraticCurveTo(
        x, y + size * 15,
        x + size * 5, y
      );
      ctx.fillStyle = hero.type === 'HERO' ? '#ff4444' : '#440000';
      ctx.fill();
    }

    // Draw hero body
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    switch(primaryPower) {
      case 'SPEED':
        // Streamlined shape
        ctx.ellipse(x, y, size * 8, size * 4, Math.PI / 4, 0, Math.PI * 2);
        break;
      case 'STRENGTH':
        // Muscular octagon
        for(let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4;
          const px = x + Math.cos(angle) * size * 6;
          const py = y + Math.sin(angle) * size * 6;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case 'FLIGHT':
        // Wing-like shape
        ctx.moveTo(x - size * 8, y);
        ctx.lineTo(x, y - size * 6);
        ctx.lineTo(x + size * 8, y);
        ctx.lineTo(x, y + size * 6);
        break;
      case 'ENERGY_BLAST':
        // Star-like shape
        for(let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4;
          const radius = i % 2 === 0 ? size * 8 : size * 5;
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case 'HEALING':
        // Cross shape
        ctx.moveTo(x - size * 4, y);
        ctx.lineTo(x + size * 4, y);
        ctx.moveTo(x, y - size * 4);
        ctx.lineTo(x, y + size * 4);
        break;
      case 'DARKNESS':
        // Shadowy form
        ctx.arc(x, y, size * 6, 0, Math.PI * 2);
        const shadowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
        shadowGradient.addColorStop(0, color);
        shadowGradient.addColorStop(1, '#000000');
        ctx.fillStyle = shadowGradient;
        break;
      case 'POISON':
        // Toxic cloud shape
        for(let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4;
          const radius = size * (6 + Math.sin(i) * 2);
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;
          i === 0 ? ctx.moveTo(px, py) : ctx.quadraticCurveTo(x, y, px, py);
        }
        ctx.closePath();
        break;
      default:
        // Default superhero shape
        ctx.arc(x, y, size * 6, 0, Math.PI * 2);
    }
    
    ctx.fill();
    ctx.stroke();

    // Draw status bars
    const barWidth = 30;
    const barHeight = 4;
    const barSpacing = 6;
    
    // Health bar
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - barWidth/2, y - size * 8, barWidth, barHeight);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x - barWidth/2, y - size * 8, barWidth * (health/100), barHeight);

    // Energy bar
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - barWidth/2, y - size * 8 + barSpacing, barWidth, barHeight);
    ctx.fillStyle = '#0088ff';
    ctx.fillRect(x - barWidth/2, y - size * 8 + barSpacing, barWidth * (energy/100), barHeight);

    // Power level bar
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - barWidth/2, y - size * 8 + barSpacing * 2, barWidth, barHeight);
    ctx.fillStyle = hero.type === 'HERO' ? '#00ff00' : '#ff00ff';
    ctx.fillRect(
      x - barWidth/2, 
      y - size * 8 + barSpacing * 2, 
      barWidth * (powerLevel/100), 
      barHeight
    );

    // Draw power type icon
    ctx.fillStyle = '#ffffff';
    ctx.font = `${size * 4}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(
      getPowerIcon(primaryPower), 
      x, 
      y + size * 2
    );

    // Draw hero type indicator
    const typeIndicator = hero.type === 'HERO' ? '👑' : '💀';
    ctx.font = `${size * 3}px Arial`;
    ctx.fillText(typeIndicator, x, y - size * 10);
  }, [getPowerIcon]);

  const drawGrid = useCallback((ctx) => {
    ctx.strokeStyle = '#2f3447';
    ctx.lineWidth = 1;
    const gridSize = 40;
    
    for (let i = 0; i <= width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    for (let i = 0; i <= height; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
  }, [width, height]);

  const drawBackground = useCallback((ctx) => {
    // Create a darker gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some particle effects
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
      ctx.fill();
    }
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background and grid
    drawBackground(ctx);
    drawGrid(ctx);

    if (gameState) {
      // Draw resources
      if (gameState.resources && Array.isArray(gameState.resources)) {
        gameState.resources.forEach(resource => drawResource(ctx, resource));
      }

      // Draw heroes/villains
      if (gameState.population && Array.isArray(gameState.population)) {
        gameState.population.forEach(hero => drawSuperhero(ctx, hero));
      }
    }
  }, [
    gameState,
    width,
    height,
    drawGrid,
    drawBackground,
    drawSuperhero,
    drawResource
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg shadow-lg"
      style={{ background: '#0a0a1a' }}
    />
  );
};

export default GameRenderer;