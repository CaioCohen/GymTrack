import seed from '@/assets/seed.json';
import { loadWorkouts, saveWorkouts } from '@/storage/workoutStorage';
import { useEffect, useState } from 'react';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await loadWorkouts();
      if (stored) setWorkouts(stored);
      else {
        setWorkouts(seed);
        saveWorkouts(seed);
      }
    })();
  }, []);

  function updateWorkouts(updated: any[]) {
    setWorkouts(updated);
    saveWorkouts(updated);
  }

  return { workouts, updateWorkouts };
}
