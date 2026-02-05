import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@gym-track/workouts';

export async function loadWorkouts() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export async function saveWorkouts(data: any) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}
