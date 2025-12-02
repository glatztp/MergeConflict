let audioContext: AudioContext | null = null;

export async function initAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
}

function playTone(frequency: number, duration: number) {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "square";

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

export function playSound(type: "start" | "hit" | "crit" | "win") {
  if (!audioContext) return;

  try {
    switch (type) {
      case "start":
        playTone(523, 0.1); // C5
        setTimeout(() => playTone(659, 0.1), 100); // E5
        setTimeout(() => playTone(784, 0.1), 200); // G5
        break;
      case "hit":
        playTone(150, 0.05);
        break;
      case "crit":
        playTone(100, 0.1);
        setTimeout(() => playTone(1047, 0.05), 50);
        break;
      case "win":
        [523, 659, 784, 1047, 1319, 1568].forEach((freq, i) => {
          setTimeout(() => playTone(freq, 0.15), i * 100);
        });
        break;
    }
  } catch (e) {
    console.log(e);
  }
}
