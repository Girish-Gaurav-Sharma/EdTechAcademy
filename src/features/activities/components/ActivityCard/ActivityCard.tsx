// src/features/activities/components/ActivityCard/ActivityCard.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Avatar, useTheme } from 'react-native-paper';
import BrandedChip from '../../../../shared/components/Chip/BrandedChip';
import { Activity, ActivityType } from '../../../../types/activity.types'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ActivityCardProps = {
  activity: Activity;
  onPress: (activity: Activity) => void; 
};


const ActivityIcon = ({ type }: { type: ActivityType }) => {
  const theme = useTheme();

  const getIconName = (): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    switch (type) {
      case 'online-class':
        return 'presentation-play';
      case 'assignment':
        return 'file-document-outline';
      case 'quiz':
        return 'beaker-question-outline';
      case 'discussion':
        return 'forum-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return (
    <Avatar.Icon
      size={40}
      style={styles.icon}
      icon={(props) => (
        <MaterialCommunityIcons
          name={getIconName()}
          size={24} 
          color={theme.colors.primary} 
        />
      )}
    />
  );
};


const CardDetails = ({ activity }: { activity: Activity }) => {
  const { colors } = useTheme();
  const detailStyle = [styles.detailText, { color: colors.onSurfaceVariant }];

  switch (activity.type) {
    case 'online-class':
      return (
        <>
          <Text variant="bodyMedium" style={detailStyle}>
            Instructor: {activity.instructor}
          </Text>
          <Text variant="bodyMedium" style={detailStyle}>
            On: {new Date(activity.scheduledAt).toLocaleDateString()}
          </Text>
        </>
      );
    case 'assignment':
    case 'quiz':
      return (
        <Text variant="bodyMedium" style={detailStyle}>
          Due: {new Date(activity.dueDate).toLocaleDateString()}
        </Text>
      );
    case 'discussion':
      return (
        <Text variant="bodyMedium" style={detailStyle}>
          Replies: {activity.replyCount}
        </Text>
      );
    default:
      return null;
  }
};


const ActivityCard = ({ activity, onPress }: ActivityCardProps) => {
  const { title, program, status, tags } = activity;

  const getActionText = () => {
    switch (status) {
      case 'not-started':
        return activity.type === 'online-class' ? 'Join Class' : 'Start';
      case 'in-progress':
        return 'Continue';
      case 'completed':
        return 'Review';
      case 'overdue':
        return 'View Details';
      default:
        return 'View';
    }
  };

  return (
    
    <Card style={styles.card} onPress={() => onPress(activity)}>

      <Card.Title
        title={title}
        titleNumberOfLines={2} 
        subtitle={program}
        left={(props) => <ActivityIcon type={activity.type} {...props} />}
      />


      <Card.Content>
        <View style={styles.chipContainer}>
          <BrandedChip style={styles.statusChip}>{status}</BrandedChip>
          {tags.slice(0, 2).map((tag) => (
            <BrandedChip key={tag} style={styles.tagChip}>
              {tag}
            </BrandedChip>
          ))}
        </View>


        <View style={styles.detailsContainer}>
          <CardDetails activity={activity} />
        </View>
      </Card.Content>


      <Card.Actions>
        <Button mode="contained" onPress={() => onPress(activity)}>
          {getActionText()}
        </Button>
      </Card.Actions>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  statusChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 8,
    minHeight: 40,
  },
  detailText: {
    marginBottom: 4,
  },
});

export default ActivityCard;