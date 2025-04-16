// Sound utility for handling sound effects in the quiz game

class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  // Singleton constructor
  private constructor() {
    this.preloadSounds();
  }

  // Get singleton instance
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  // Load all necessary sounds
  private preloadSounds(): void {
    this.loadSound('correct', '/sounds/correct.mp3');
    this.loadSound('incorrect', '/sounds/incorrect.mp3');
    this.loadSound('timeout', '/sounds/timeout.mp3');
    this.loadSound('complete', '/sounds/complete.mp3');
  }

  // Load an individual sound
  private loadSound(name: string, path: string): void {
    try {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(name, audio);
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  // Play a sound by name
  public play(soundName: string): void {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.error(`Error playing sound: ${soundName}`, err);
      });
    }
  }

  // Enable or disable sounds
  public toggleSound(enabled: boolean): void {
    this.enabled = enabled;
  }

  // Check if sound is enabled
  public isSoundEnabled(): boolean {
    return this.enabled;
  }

  // Optional: Stop a specific sound
  public stop(soundName: string): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  // Optional: Set volume for all sounds (0.0 to 1.0)
  public setVolume(volume: number): void {
    this.sounds.forEach(sound => {
      sound.volume = volume;
    });
  }
}

// Export a singleton instance
const soundManager = SoundManager.getInstance();
export default soundManager;
