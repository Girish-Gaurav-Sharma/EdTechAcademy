// src/features/activities/components/ActivityCard/ActivityCard.tsx
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Button, Avatar, useTheme, ProgressBar } from 'react-native-paper';
import BrandedChip from '../../../../shared/components/Chip/BrandedChip';
import { Activity, ActivityType } from '../../../../types/activity.types'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDate, formatDateTime, formatDuration, formatActivityTypeLabel, formatScore } from '../../../../utils/formatters';

type ActivityCardProps = {
  activity: Activity;
  onPress: (activity: Activity) => void;
  onActionPress?: (activity: Activity) => void; 
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
          <Text variant="bodyMedium" style={detailStyle} numberOfLines={1}>
            When: {formatDateTime(activity.scheduledAt)}{activity.durationMinutes ? ` • ${formatDuration(activity.durationMinutes)}` : ''}{activity.isLive ? ' • Live' : ''}
          </Text>
        </>
      );
    case 'assignment':
      return (
        <>
          <Text variant="bodyMedium" style={detailStyle}>
            Due: {formatDate(activity.dueDate)}
          </Text>
          <Text variant="bodyMedium" style={detailStyle} numberOfLines={1}>
            {typeof activity.earnedScore === 'number' ? `Score: ${formatScore(activity.earnedScore, activity.maxScore)}` : `Max: ${activity.maxScore} pts`}
          </Text>
        </>
      );
    case 'quiz':
      return (
        <>
          <Text variant="bodyMedium" style={detailStyle} numberOfLines={1}>
            Due: {formatDate(activity.dueDate)} • {formatDuration(activity.durationMinutes)}
          </Text>
          <Text variant="bodyMedium" style={detailStyle} numberOfLines={1}>
            Qs: {activity.questionCount} • Att: {activity.attemptsUsed ?? 0}/{activity.attemptsAllowed}
          </Text>
        </>
      );
    case 'discussion':
      return (
        <>
          <Text variant="bodyMedium" style={detailStyle}>
            Replies: {activity.replyCount}
          </Text>
          <Text variant="bodyMedium" style={detailStyle} numberOfLines={1}>
            Last: {formatDateTime(activity.lastActivityAt)}
          </Text>
        </>
      );
    default:
      return null;
  }
};


const ActivityCard = ({ activity, onPress, onActionPress }: ActivityCardProps) => {
  const { title, program, status, tags, priority, description, progressPercent } = activity;

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
        <View style={styles.contentWrapper}>
          {!!description && (
            <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
              {description}
            </Text>
          )}

          <View style={styles.chipContainer}>
            <BrandedChip style={styles.statusChip}>{status}</BrandedChip>
            <BrandedChip style={styles.priorityChip}>{priority}</BrandedChip>
            <BrandedChip style={styles.typeChip}>{formatActivityTypeLabel(activity.type)}</BrandedChip>
          </View>

          <View style={styles.detailsContainer}>
            <CardDetails activity={activity} />
          </View>

          <View style={styles.progressContainer}>
            <ProgressBar progress={Math.max(0, Math.min(1, (progressPercent ?? 0) / 100))} />
            <Text variant="labelSmall" style={styles.progressLabel}>
              {typeof progressPercent === 'number' ? `${progressPercent}% complete` : ' '}
            </Text>
          </View>
        </View>
      </Card.Content>


      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            if (onActionPress) {
              onActionPress(activity);
            } else {
              Alert.alert('Not implemented', 'This action is not available yet.');
            }
          }}
          accessibilityLabel="Primary action (not implemented)"
          testID="activity-primary-action"
        >
          {getActionText()}
        </Button>
      </Card.Actions>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  statusChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  priorityChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  typeChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 6,
  },
  detailText: {
    marginBottom: 3,
  },
  description: {
    marginBottom: 6,
  },
  contentWrapper: {
    minHeight: 150,
  },
  liveChip: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  participatedChip: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  progressContainer: {
    marginTop: 6,
  },
  progressLabel: {
    marginTop: 3,
  },
});

export default ActivityCard;