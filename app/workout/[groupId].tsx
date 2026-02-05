import { exerciseImages } from '@/assets/images/imageMap';
import ListItem from '@/components/ui/list-item';
import { useWorkouts } from '@/hooks/useWorkouts';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View, } from 'react-native';

export default function WorkoutExercisesScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { workouts, updateWorkouts } = useWorkouts();

  const group = workouts.find(g => g.id === groupId);

  if (!group) {
    return (
      <View style={styles.center}>
        <Text>Grupo não encontrado</Text>
      </View>
    );
  }

  function toggleExerciseChecked(exerciseId: string) {
    const updated = workouts.map(g => {
      if (g.id !== groupId) return g;

      return {
        ...g,
        exercises: g.exercises.map(ex =>
          ex.id === exerciseId
            ? { ...ex, checked: !ex.checked }
            : ex
        ),
      };
    });

    updateWorkouts(updated);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.title}</Text>

      {group.exercises.map(exercise => (
        <ListItem
          key={exercise.id}
          onPress={() =>
            router.push({
              pathname: '/exercise/[exerciseId]',
              params: { exerciseId: exercise.id },
            })
          }
        >
          {/* Checkbox */}
          <Pressable
            style={[
              styles.checkbox,
              exercise.checked && styles.checkboxChecked,
            ]}
            onPress={() => toggleExerciseChecked(exercise.id)}
          />

          {/* Imagem default */}
          <Image
            source={exerciseImages[exercise.image] ?? exerciseImages.default}
            style={styles.image}
            />

          {/* Nome */}
          <Text style={styles.name}>{exercise.name}</Text>
        </ListItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
