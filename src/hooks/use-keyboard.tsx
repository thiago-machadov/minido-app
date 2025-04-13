import { useEffect, useState } from "react";

interface UseKeyboardProps {
  keysMap: Record<string, string[]>;
  keysHandlers: Record<string, () => void>;
}

export function useKeyboard({ keysMap, keysHandlers }: UseKeyboardProps) {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  useEffect(() => {
    let timeout: number;

    const handleKeyPress = (event: KeyboardEvent) => {
      clearTimeout(timeout);

      const key = event.key;

      setKeysPressed((prevState) => [...prevState, key]);

      timeout = setTimeout(() => {
        setKeysPressed([]);
      }, 500);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    for (const combinationKey of Object.keys(keysMap)) {
      const keyCombination = keysMap[combinationKey];

      if (keyCombination.length === keysPressed.length) {
        let isMatch = true;

        for (let i = 0; i < keyCombination.length; i++) {
          if (keyCombination[i] !== keysPressed[i]) {
            isMatch = false;
            break;
          }
        }

        if (isMatch) {
          keysHandlers[combinationKey]();
          setKeysPressed([]);
          break;
        }
      }
    }
  }, [keysPressed]);
}
