import ListItem from '@/components/ui/list-item';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const GROUPS = [
  { id: 'peito-triceps', title: 'Peito, tríceps' },
  { id: 'costas-biceps', title: 'Costas, bíceps' },
  { id: 'pernas-ombros', title: 'Pernas, ombros' },
];

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      {GROUPS.map(group => (
        <ListItem
          key={group.id}
          onPress={() =>
            router.push({
              pathname: '/workout/[groupId]',
              params: { groupId: group.id },
            })
          }
        >
          <Text style={styles.text}>{group.title}</Text>
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
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
