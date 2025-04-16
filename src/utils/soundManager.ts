// Sound utility for handling sound effects in the quiz game

class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  private constructor() {
    // Initialize sounds
    this.preloadSounds();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private preloadSounds(): void {
    // Preload all sounds
    this.loadSound('correct', '/sounds/correct.mp3');
    this.loadSound('incorrect', '/sounds/incorrect.mp3');
    this.loadSound('timeout', '/sounds/timeout.mp3');
    this.loadSound('complete', '/sounds/complete.mp3');
  }

  private loadSound(name: string, path: string): void {
    try {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(name, audio);
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  public play(soundName: string): void {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      // Reset the sound to the beginning if it's playing
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.error(`Error playing sound: ${soundName}`, err);
      });
    }
  }

  public toggleSound(enabled: boolean): void {
    this.enabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.enabled;
  }
}

// Export a singleton instance
const soundManager = SoundManager.getInstance();
export default soundManager;