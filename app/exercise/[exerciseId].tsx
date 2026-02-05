import { exerciseImages } from '@/assets/images/imageMap';
import { useWorkouts } from '@/hooks/useWorkouts';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


export default function ExerciseDetailScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const { workouts, updateWorkouts } = useWorkouts();

  const group = workouts.find(g =>
    g.exercises.some((e: any) => e.id === exerciseId)
  );

  const exercise = group?.exercises.find((e: any) => e.id === exerciseId);

  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const [time, setTime] = useState(60);
  const [running, setRunning] = useState(false);

  // Inicializa inputs
  useEffect(() => {
    if (exercise) {
      setWeight(String(exercise.weight));
      setNotes(exercise.notes ?? '');
    }
  }, [exercise]);

  // Timer
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev === 1) {
          setRunning(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  function persistChanges(updatedExercise: any) {
    const updated = workouts.map(g => {
      if (g.id !== group?.id) return g;

      return {
        ...g,
        exercises: g.exercises.map((e: any) =>
          e.id === exerciseId ? updatedExercise : e
        ),
      };
    });

    updateWorkouts(updated);
  }

  function updateWeight(value: string) {
    setWeight(value);

    if (!exercise) return;

    persistChanges({
      ...exercise,
      weight: Number(value) || 0,
    });
  }

  function updateNotes(value: string) {
    setNotes(value);

    if (!exercise) return;

    persistChanges({
      ...exercise,
      notes: value,
    });
  }

  function toggleTimer() {
    if (running) {
      setRunning(false);
      setTime(60);
    } else {
      setRunning(true);
    }
  }

  if (!exercise) {
    return (
      <View style={styles.center}>
        <Text>Exercício não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>

      <Image
        source={exerciseImages[exercise.image] ?? exerciseImages.default}
        style={styles.image}
      />

      <Text style={styles.reps}>{exercise.reps}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Carga (kg)</Text>
        <TextInput
          value={weight}
          onChangeText={updateWeight}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Anotações</Text>
        <TextInput
          value={notes}
          onChangeText={updateNotes}
          multiline
          style={[styles.input, styles.notes]}
        />
      </View>

      <Pressable
        style={[styles.timerButton, running && styles.timerRunning]}
        onPress={toggleTimer}
      >
        <Text style={styles.timerText}>
          {running ? `${time}s` : 'Iniciar descanso'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  reps: {
    fontSize: 18,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  notes: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  timerButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  timerRunning: {
    backgroundColor: '#e74c3c',
  },
  timerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});