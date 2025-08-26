'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface SpaceInvadersProps {
  onGameEnd: (score: number) => void;
  onBack: () => void;
}

export default function SpaceInvaders({ onGameEnd, onBack }: SpaceInvadersProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<any>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [Phaser, setPhaser] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Phaser only on client side
    const loadPhaser = async () => {
      const PhaserModule = await import('phaser');
      setPhaser(PhaserModule.default);
    };
    
    loadPhaser();
  }, []);

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current || !Phaser) return;

    // Clear any existing game instance
    if (phaserGameRef.current) {
      phaserGameRef.current.destroy(true);
      phaserGameRef.current = null;
    }

    // Game variables
    let player: Phaser.Physics.Arcade.Sprite;
    let invaders: Phaser.Physics.Arcade.Group;
    let bullets: Phaser.Physics.Arcade.Group;
    let invaderBullets: Phaser.Physics.Arcade.Group;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let spaceKey: Phaser.Input.Keyboard.Key;
    let score = 0;
    let scoreText: Phaser.GameObjects.Text;
    let livesText: Phaser.GameObjects.Text;
    let lives = 3;
    let gameOver = false;

    class GameScene extends Phaser.Scene {
      constructor() {
        super({ key: 'GameScene' });
      }

      preload() {
        // Create simple colored rectangles as sprites
        this.add.graphics()
          .fillStyle(0x00ff00)
          .fillRect(0, 0, 32, 16)
          .generateTexture('player', 32, 16);

        this.add.graphics()
          .fillStyle(0xff0000)
          .fillRect(0, 0, 24, 16)
          .generateTexture('invader', 24, 16);

        this.add.graphics()
          .fillStyle(0xffff00)
          .fillRect(0, 0, 4, 8)
          .generateTexture('bullet', 4, 8);

        this.add.graphics()
          .fillStyle(0xff00ff)
          .fillRect(0, 0, 4, 8)
          .generateTexture('invaderBullet', 4, 8);
      }

      create() {
        // Create player
        player = this.physics.add.sprite(400, 550, 'player');
        player.setCollideWorldBounds(true);

        // Create invaders group
        invaders = this.physics.add.group();
        
        // Create invaders in formation
        for (let y = 0; y < 5; y++) {
          for (let x = 0; x < 11; x++) {
            const invader = invaders.create(x * 60 + 100, y * 50 + 100, 'invader');
            invader.body.velocity.x = 50;
          }
        }

        // Create bullets groups
        bullets = this.physics.add.group();
        invaderBullets = this.physics.add.group();

        // Input - ensure keyboard is enabled
        this.input.keyboard!.enabled = true;
        cursors = this.input.keyboard!.createCursorKeys();
        spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Additional key bindings for better compatibility
        const leftKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const rightKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // Store additional keys for use in update
        (this as any).leftKey = leftKey;
        (this as any).rightKey = rightKey;

        // UI
        scoreText = this.add.text(16, 16, 'Score: 0', { 
          fontSize: '18px', 
          color: '#00ff00',
          fontFamily: 'monospace'
        });
        
        livesText = this.add.text(16, 40, 'Lives: 3', { 
          fontSize: '18px', 
          color: '#00ff00',
          fontFamily: 'monospace'
        });

        // Collisions
        this.physics.add.overlap(bullets, invaders, this.hitInvader, undefined, this);
        this.physics.add.overlap(invaderBullets, player, this.hitPlayer, undefined, this);
        this.physics.add.overlap(bullets, invaderBullets, this.bulletCollision, undefined, this);

        // Invader movement timer
        this.time.addEvent({
          delay: 2000,
          callback: this.moveInvadersDown,
          callbackScope: this,
          loop: true
        });

        // Invader shooting timer
        this.time.addEvent({
          delay: 1000,
          callback: this.invaderShoot,
          callbackScope: this,
          loop: true
        });

        setGameStarted(true);
        
        // Ensure the game canvas has focus for keyboard input
        setTimeout(() => {
          const canvas = gameRef.current?.querySelector('canvas');
          if (canvas) {
            canvas.focus();
            canvas.setAttribute('tabindex', '0');
          }
        }, 100);
      }

      update() {
        if (gameOver) return;

        // Player movement - multiple key options
        const leftPressed = cursors.left.isDown || (this as any).leftKey.isDown;
        const rightPressed = cursors.right.isDown || (this as any).rightKey.isDown;
        
        if (leftPressed) {
          player.setVelocityX(-300);
        } else if (rightPressed) {
          player.setVelocityX(300);
        } else {
          player.setVelocityX(0);
        }

        // Player shooting
        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
          this.playerShoot();
        }

        // Check win condition
        if (invaders.countActive() === 0) {
          this.gameWin();
        }

        // Check if invaders reached bottom
        invaders.children.entries.forEach((invader: any) => {
          if (invader.active && invader.y > 500) {
            this.gameOverHandler();
          }
        });
      }

      playerShoot() {
        const bullet = bullets.create(player.x, player.y - 20, 'bullet');
        bullet.setVelocityY(-400);
        bullet.body.onWorldBounds = true;
        bullet.body.world.on('worldbounds', (event: any, body: any) => {
          if (body.gameObject === bullet) {
            bullet.destroy();
          }
        });
      }

      invaderShoot() {
        const activeInvaders = invaders.children.entries.filter((invader: any) => invader.active);
        if (activeInvaders.length > 0) {
          const randomInvader = Phaser.Utils.Array.GetRandom(activeInvaders) as any;
          const bullet = invaderBullets.create(randomInvader.x, randomInvader.y + 20, 'invaderBullet');
          bullet.setVelocityY(200);
          bullet.body.onWorldBounds = true;
          bullet.body.world.on('worldbounds', (event: any, body: any) => {
            if (body.gameObject === bullet) {
              bullet.destroy();
            }
          });
        }
      }

      hitInvader(bullet: any, invader: any) {
        bullet.destroy();
        invader.destroy();
        score += 10;
        scoreText.setText('Score: ' + score);
      }

      hitPlayer(bullet: any, player: any) {
        bullet.destroy();
        lives--;
        livesText.setText('Lives: ' + lives);
        
        if (lives <= 0) {
          this.gameOverHandler();
        } else {
          // Brief invincibility
          player.setTint(0xff0000);
          this.time.delayedCall(1000, () => {
            player.clearTint();
          });
        }
      }

      bulletCollision(playerBullet: any, invaderBullet: any) {
        playerBullet.destroy();
        invaderBullet.destroy();
      }

      moveInvadersDown() {
        let changeDirection = false;
        
        invaders.children.entries.forEach((invader: any) => {
          if (invader.active && (invader.x <= 50 || invader.x >= 750)) {
            changeDirection = true;
          }
        });

        if (changeDirection) {
          invaders.children.entries.forEach((invader: any) => {
            if (invader.active) {
              invader.y += 30;
              invader.body.velocity.x *= -1;
            }
          });
        }
      }

      gameOverHandler() {
        gameOver = true;
        this.add.text(400, 300, 'GAME OVER', {
          fontSize: '48px',
          color: '#ff0000',
          fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        this.add.text(400, 350, 'Press ESC to return', {
          fontSize: '24px',
          color: '#ffffff',
          fontFamily: 'monospace'
        }).setOrigin(0.5);

        this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).on('down', () => {
          onGameEnd(score);
        });
      }

      gameWin() {
        gameOver = true;
        this.add.text(400, 300, 'YOU WIN!', {
          fontSize: '48px',
          color: '#00ff00',
          fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        this.add.text(400, 350, 'Press ESC to return', {
          fontSize: '24px',
          color: '#ffffff',
          fontFamily: 'monospace'
        }).setOrigin(0.5);

        this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).on('down', () => {
          onGameEnd(score);
        });
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      backgroundColor: '#000000',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      scene: GameScene,
      input: {
        keyboard: true
      }
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [onGameEnd, Phaser]);

  if (!Phaser) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-green-400 font-mono text-xl">LOADING GAME ENGINE...</p>
          <p className="text-slate-400 font-mono text-sm mt-2">Initializing Phaser.js</p>
        </div>
        <button
          onClick={onBack}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg font-mono border-2 border-red-800 transition-colors"
        >
          ← BACK TO ARCADE
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Game Controls Info */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h3 className="text-green-400 font-mono text-lg mb-2 text-center">CONTROLS</h3>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono text-white">
          <div>← → or A D : Move</div>
          <div>SPACE : Shoot</div>
          <div>ESC : Exit Game</div>
          <div>Goal: Destroy all invaders!</div>
        </div>
      </div>

      {/* Game Container */}
      <div className="border-4 border-green-500 rounded-lg overflow-hidden shadow-2xl shadow-green-500/20">
        <div ref={gameRef} className="w-full h-full" />
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg font-mono border-2 border-red-800 transition-colors"
      >
        ← BACK TO ARCADE
      </button>
    </div>
  );
}
