/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Song } from './types';
import { getSongMelody } from './songMelodies';

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private actx: AudioContext | null = null;
  private synth: {
    master: GainNode;
    bass: OscillatorNode;
    timer: any;
    filter: BiquadFilterNode;
  } | null = null;

  private isPlayingSynth = false;
  private isPlayingYt = false;
  private volumeValue = 0.8;
  private isMutedValue = false;
  private currentSong: Song | null = null;

  // YouTube Player properties
  private ytPlayer: any = null;
  private isYtReady = false;
  private ytPlayerContainerId = 'youtube-player-hidden-container';
  private triedFallback = false;
  private ytReadyPromise: Promise<any> | null = null;

  // Callbacks for React state synchronization
  public onTimeUpdate: (time: number) => void = () => {};
  public onDurationChange: (duration: number) => void = () => {};
  public onEnded: () => void = () => {};
  public onPlaybackStatus: (isRealAudio: boolean) => void = () => {};

  private clockInterval: any = null;
  private startTime = 0;
  private simulatedTime = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'none';
      
      this.audio.addEventListener('timeupdate', () => {
        if (!this.isPlayingSynth && !this.isPlayingYt && this.audio) {
          this.onTimeUpdate(this.audio.currentTime);
        }
      });

      this.audio.addEventListener('durationchange', () => {
        if (!this.isPlayingSynth && !this.isPlayingYt && this.audio && !isNaN(this.audio.duration)) {
          this.onDurationChange(this.audio.duration);
        }
      });

      this.audio.addEventListener('ended', () => {
        if (!this.isPlayingSynth && !this.isPlayingYt) {
          this.onEnded();
        }
      });

      this.audio.addEventListener('error', () => {
        const err = this.audio?.error;
        if (err && err.code === 1) { // MediaError.MEDIA_ERR_ABORTED
          return;
        }
        // Fall back to synthesizer if network or file loading fails!
        if (!this.isPlayingYt) {
          console.warn('Audio stream failed. Activating Sonora Ambient Synthesizer fallback.', err);
          if (this.currentSong) {
            this.startSynthesizer(this.currentSong);
          }
        }
      });
    }
  }

  private initContext() {
    try {
      if (!this.actx) {
        this.actx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.actx && this.actx.state === 'suspended') {
        this.actx.resume();
      }
    } catch (e) {
      console.error('Failed to initialize AudioContext:', e);
    }
  }

  private loadYtApi(): Promise<void> {
    return new Promise((resolve) => {
      const win = window as any;
      if (win.YT && win.YT.Player) {
        resolve();
        return;
      }

      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }

      // Chain or create callback
      const previousCallback = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        resolve();
      };

      // Periodic check as safe fallback
      const checkInterval = setInterval(() => {
        if (win.YT && win.YT.Player) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 150);
    });
  }

  private setYtContainerVisible(visible: boolean) {
    const container = document.getElementById(this.ytPlayerContainerId);
    if (!container) return;

    if (visible) {
      container.style.display = 'block';
      container.style.opacity = '1';
      container.style.pointerEvents = 'auto';
    } else {
      // Move off-screen instead of display: none to allow autoplay & background play
      container.style.display = 'block';
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '16px';
      container.style.height = '9px';
      container.style.pointerEvents = 'none';
      container.style.opacity = '0.001';
    }
  }

  public ensureYtPlayer(): Promise<any> {
    if (this.ytReadyPromise) {
      return this.ytReadyPromise;
    }

    this.ytReadyPromise = this.loadYtApi().then(() => {
      return new Promise((resolve) => {
        if (this.ytPlayer && this.isYtReady) {
          resolve(this.ytPlayer);
          return;
        }

        let el = document.getElementById(this.ytPlayerContainerId);
        if (!el) {
          // Fallback container if React hasn't rendered it yet
          el = document.createElement('div');
          el.id = this.ytPlayerContainerId;
          el.style.display = 'block';
          el.style.position = 'fixed';
          el.style.left = '-9999px';
          el.style.top = '-9999px';
          el.style.width = '16px';
          el.style.height = '9px';
          el.style.pointerEvents = 'none';
          el.style.opacity = '0.001';
          document.body.appendChild(el);
        }

        let inner = document.getElementById(this.ytPlayerContainerId + '-inner');
        if (!inner) {
          inner = document.createElement('div');
          inner.id = this.ytPlayerContainerId + '-inner';
          inner.style.width = '100%';
          inner.style.height = '100%';
          el.appendChild(inner);
        }

        const win = window as any;
        const YT = win.YT;
        this.ytPlayer = new YT.Player(this.ytPlayerContainerId + '-inner', {
          height: '100%',
          width: '100%',
          videoId: '',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            enablejsapi: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
          },
          events: {
            onReady: () => {
              this.isYtReady = true;
              resolve(this.ytPlayer);
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.ENDED = 0
              if (event.data === 0) {
                if (this.isPlayingYt) {
                  this.onEnded();
                }
              }
            },
            onError: (event: any) => {
              const errCode = event && event.data !== undefined ? event.data : event;
              console.warn(`YouTube Iframe Player error code: ${errCode}.`);
              this.setYtContainerVisible(false);

              // Error codes: 5 (HTML5 error), 101/150 (not allowed in embedded players), 2 (invalid parameter)
              if (this.currentSong && (errCode === 101 || errCode === 150 || errCode === 5 || errCode === 2)) {
                if (!this.triedFallback) {
                  this.triedFallback = true;
                  console.log(`[AudioEngine] Video restricted (error ${errCode}). Trying fallback...`);
                  this.retryWithFallback(this.currentSong, 0);
                  return;
                }
              }

              this.fallbackToSynth();
            }
          },
        });
      });
    });

    return this.ytReadyPromise;
  }

  private async retryWithFallback(song: Song, attempt: number) {
    const strategies = [
      `/api/youtube-id?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&fallback=true`,
      `/api/youtube-id?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`,
    ];

    if (attempt >= strategies.length) {
      console.log('[AudioEngine] All fallback attempts exhausted, using synthesizer.');
      this.fallbackToSynth();
      return;
    }

    try {
      console.log(`[AudioEngine] Fallback attempt ${attempt + 1}/${strategies.length} for "${song.title}"...`);
      const res = await fetch(strategies[attempt]);
      const data = await res.json();

      if (data && data.youtubeId) {
        console.log(`[AudioEngine] Found fallback ID on attempt ${attempt + 1}:`, data.youtubeId);
        // Cache the working ID
        try {
          const cache = JSON.parse(localStorage.getItem('sonora_yt_cache') || '{}');
          cache[song.title + ' - ' + song.artist] = data.youtubeId;
          localStorage.setItem('sonora_yt_cache', JSON.stringify(cache));
        } catch (e) {}
        this.playYt(data.youtubeId);
      } else {
        await this.retryWithFallback(song, attempt + 1);
      }
    } catch (err) {
      console.warn(`[AudioEngine] Fallback attempt ${attempt + 1} failed:`, err);
      await this.retryWithFallback(song, attempt + 1);
    }
  }

  private fallbackToSynth() {
    this.isPlayingYt = false;
    if (this.audio) {
      this.audio.pause();
    }
    if (this.currentSong) {
      console.log('[AudioEngine] Active fallback to Sonora Ambient Synthesizer.');
      this.startSynthesizer(this.currentSong, this.simulatedTime);
    }
  }

  public play(song: Song) {
    this.initContext();
    this.currentSong = song;
    this.triedFallback = false; // Reset fallback for new song search
    this.stopSynthesizer();
    this.stopClock();

    // Check if YouTube Video ID is already resolved in this session or localStorage
    let cachedYtId = (song as any).ytVideoId || null;
    if (!cachedYtId) {
      try {
        const cache = JSON.parse(localStorage.getItem('sonora_yt_cache') || '{}');
        cachedYtId = cache[song.title + ' - ' + song.artist] || null;
      } catch (e) {}
    }

    if (cachedYtId) {
      this.playYt(cachedYtId);
    } else {
      this.isPlayingYt = false;
      this.isPlayingSynth = false;
      this.onPlaybackStatus(true); // Signal to UI that we are playing/loading real audio

      // Fetch official song from YouTube via Gemini search grounding
      fetch(`/api/youtube-id?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.youtubeId) {
            (song as any).ytVideoId = data.youtubeId;
            try {
              const cache = JSON.parse(localStorage.getItem('sonora_yt_cache') || '{}');
              cache[song.title + ' - ' + song.artist] = data.youtubeId;
              localStorage.setItem('sonora_yt_cache', JSON.stringify(cache));
            } catch (e) {}

            // Transition seamlessly to official YouTube stream
            this.playYt(data.youtubeId);
          } else {
            console.warn('No YouTube ID found. Falling back to ambient synthesizer.');
            this.fallbackToSynth();
          }
        })
        .catch((err) => {
          console.warn('Failed to fetch YouTube ID dynamically. Falling back to ambient synthesizer.', err);
          this.fallbackToSynth();
        });
    }
  }

  private playYt(ytId: string) {
    this.isPlayingYt = true;
    this.isPlayingSynth = false;
    this.onPlaybackStatus(true);

    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthesizer();
    this.setYtContainerVisible(true);

    this.ensureYtPlayer().then((player) => {
      try {
        player.setVolume(Math.round(this.getEffectiveVolume() * 100));
        player.loadVideoById(ytId);
        player.playVideo();
        this.startClock();
      } catch (e) {
        console.error('Error initiating YT Play:', e);
      }
    });
  }

  public resume() {
    this.initContext();
    if (this.isPlayingSynth && this.currentSong) {
      this.startSynthesizer(this.currentSong, this.simulatedTime);
    } else if (this.isPlayingYt && this.ytPlayer && this.isYtReady) {
      this.ytPlayer.playVideo();
      this.startClock();
    } else if (this.audio) {
      this.audio.play().catch(() => {
        if (this.currentSong) {
          this.startSynthesizer(this.currentSong, this.simulatedTime);
        }
      });
    }
  }

  public pause() {
    if (this.isPlayingSynth) {
      this.stopSynthesizer(true); // temporary pause, hold simulated time
    } else if (this.isPlayingYt && this.ytPlayer && this.isYtReady) {
      this.ytPlayer.pauseVideo();
      this.stopClock();
    } else if (this.audio) {
      this.audio.pause();
    }
  }

  public seek(seconds: number) {
    if (this.isPlayingSynth) {
      this.simulatedTime = Math.max(0, Math.min(seconds, this.currentSong?.duration || 200));
      this.onTimeUpdate(this.simulatedTime);
    } else if (this.isPlayingYt && this.ytPlayer && this.isYtReady) {
      this.ytPlayer.seekTo(seconds, true);
      this.onTimeUpdate(seconds);
    } else if (this.audio) {
      this.audio.currentTime = seconds;
    }
  }

  public setVolume(vol: number) {
    this.volumeValue = Math.max(0, Math.min(1, vol));
    this.applyVolume();
  }

  public setMute(mute: boolean) {
    this.isMutedValue = mute;
    this.applyVolume();
  }

  private getEffectiveVolume(): number {
    return this.isMutedValue ? 0 : this.volumeValue;
  }

  private applyVolume() {
    const vol = this.getEffectiveVolume();
    if (this.audio) {
      this.audio.volume = vol;
    }
    if (this.isPlayingYt && this.ytPlayer && this.isYtReady) {
      try {
        this.ytPlayer.setVolume(Math.round(vol * 100));
      } catch (e) {}
    }
    if (this.synth && this.actx) {
      this.synth.master.gain.setTargetAtTime(0.4 * vol, this.actx.currentTime, 0.1);
    }
  }

  /**
   * Generates a unique, high-quality ambient synth sequence seeded by the song id.
   * Plays the actual melody and chords of the song being played!
   */
  private startSynthesizer(song: Song, startOffsetSeconds = 0) {
    this.initContext();
    if (!this.actx) return;

    this.stopSynthesizer();
    this.isPlayingSynth = true;
    this.onPlaybackStatus(false);
    this.simulatedTime = startOffsetSeconds;

    const baseHues = song.hues;
    
    // Create nodes
    const master = this.actx.createGain();
    master.gain.value = 0;
    master.connect(this.actx.destination);
    master.gain.linearRampToValueAtTime(0.4 * this.getEffectiveVolume(), this.actx.currentTime + 0.5);

    const filter = this.actx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1600 + (baseHues[0] % 100) * 8; // dynamic filtering based on song's hues
    filter.connect(master);

    // Get the actual, recognizable melody, root frequency, and chord progressions for this song
    const songMelody = getSongMelody(song.title, song.artist, song.id);
    const rootFreq = songMelody.rootFreq;
    const melody = songMelody.melody;
    const chords = songMelody.chords;

    // Warm sub-bass drone playing the key of the actual song
    const bass = this.actx.createOscillator();
    const bassGain = this.actx.createGain();
    
    bass.type = 'sine';
    bass.frequency.value = rootFreq / 4; // Sub-bass is 2 octaves below root
    bassGain.gain.value = 0.22;
    bass.connect(bassGain);
    bassGain.connect(filter);
    bass.start();
    
    const playNote = (frequency: number, time: number, duration: number) => {
      if (!this.actx) return;
      const osc = this.actx.createOscillator();
      const gain = this.actx.createGain();
      
      // Use triangle waves for soft flute-like bell tones
      osc.type = 'triangle';
      osc.frequency.value = frequency;
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.24, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.02);
      
      osc.connect(gain);
      gain.connect(filter);
      
      osc.start(time);
      osc.stop(time + duration);
    };

    let step = 0;
    const tick = () => {
      if (!this.actx || !this.isPlayingSynth) return;
      const now = this.actx.currentTime;
      
      // Every 0.4 seconds, play the actual song melody step
      const melodyNoteOffset = melody[step % melody.length];
      if (melodyNoteOffset !== -1 && melodyNoteOffset !== undefined) {
        const melodyFreq = rootFreq * Math.pow(2, melodyNoteOffset / 12);
        playNote(melodyFreq, now + 0.01, 0.7);
      }
      
      // Warm backing synth chords playing the actual song's chord progression
      if (step % 8 === 0) {
        const chordIndex = Math.floor(step / 8) % chords.length;
        const activeChord = chords[chordIndex];
        activeChord.forEach((noteOffset) => {
          const chordNoteFreq = rootFreq * Math.pow(2, (noteOffset - 12) / 12); // chords play one octave down for fullness
          playNote(chordNoteFreq, now + 0.02, 1.8);
        });
      }

      step++;
    };

    // Trigger initial tick and start timer
    tick();
    const timer = setInterval(tick, 400);

    this.synth = { master, bass, timer, filter };
    this.startClock();
  }

  private stopSynthesizer(pause = false) {
    if (this.synth) {
      clearInterval(this.synth.timer);
      const synthNode = this.synth;
      try {
        if (this.actx) {
          synthNode.master.gain.cancelScheduledValues(this.actx.currentTime);
          synthNode.master.gain.linearRampToValueAtTime(0, this.actx.currentTime + 0.3);
          setTimeout(() => {
            try {
              synthNode.bass.stop();
            } catch (e) {}
          }, 300);
        }
      } catch (e) {
        console.error('Error stopping synthesizer nodes:', e);
      }
      this.synth = null;
    }
    if (!pause) {
      this.isPlayingSynth = false;
      this.stopClock();
    }
  }

  private startClock() {
    this.stopClock();
    this.startTime = performance.now();
    this.clockInterval = setInterval(() => {
      if (this.isPlayingSynth && this.currentSong) {
        this.simulatedTime += 0.25; // tick every quarter-second
        this.onTimeUpdate(this.simulatedTime);
        
        if (this.simulatedTime >= this.currentSong.duration) {
          this.stopClock();
          this.onEnded();
        }
      } else if (this.isPlayingYt && this.ytPlayer && this.isYtReady) {
        try {
          const state = this.ytPlayer.getPlayerState();
          // YT.PlayerState.PLAYING = 1
          if (state === 1) {
            const current = this.ytPlayer.getCurrentTime();
            const dur = this.ytPlayer.getDuration();
            this.onTimeUpdate(current);
            if (dur && dur > 0) {
              this.onDurationChange(dur);
            }
          }
        } catch (e) {}
      }
    }, 250);
  }

  private stopClock() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  public destroy() {
    this.stopSynthesizer();
    this.stopClock();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}

export const audioEngine = new AudioEngine();
