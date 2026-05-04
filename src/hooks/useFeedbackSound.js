import { useEffect, useRef } from 'react';
import Sound from 'react-native-sound';

export default function useFeedbackSound() {
  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    Sound.setCategory('Playback');

    correctSound.current = new Sound('correct', Sound.MAIN_BUNDLE);
    wrongSound.current = new Sound('wrong', Sound.MAIN_BUNDLE);

    return () => {
      correctSound.current?.release();
      wrongSound.current?.release();
    };
  }, []);

  const playCorrect = () => {
    correctSound.current?.stop(() => {
      correctSound.current?.play();
    });
  };

  const playWrong = () => {
    wrongSound.current?.stop(() => {
      wrongSound.current?.play();
    });
  };

  return {
    playCorrect,
    playWrong,
  };
}

