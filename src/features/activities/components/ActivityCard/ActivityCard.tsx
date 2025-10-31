// src/features/activities/components/ActivityCard/ActivityCard.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Chip, Button, Avatar, useTheme } from 'react-native-paper';
import { Activity, ActivityType } from '../../../../types/activity.types'; // Adjust path as needed

// Define the props our component will accept
type ActivityCardProps = {
  activity: Activity;
  onPress: (activity: Activity) => void; // Pass the activity back on press
};

// --- Helper Sub-Component 1: ActivityIcon ---
// This component returns the correct icon based on the activity type
const ActivityIcon = ({ type }: { type: ActivityType }) => {
  const iconName = () => {
    switch (type) {
      case 'online-class':
        return 'video'; // Icon for class
      case 'assignment':
        return 'file-document-edit'; // Icon for assignment
      case 'quiz':
        return 'lightbulb-on'; // Icon for quiz
      case 'discussion':
        return 'forum'; // Icon for discussion
      default:
        return 'help-circle'; // Fallback
    }
  };
  return <Avatar.Icon size={40} icon={iconName()} style={styles.icon} />;
};

// --- Helper Sub-Component 2: CardDetails ---
// This uses the Discriminated Union to show specific details
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

// --- Main ActivityCard Component ---
const ActivityCard = ({ activity, onPress }: ActivityCardProps) => {
  const { title, program, status, tags } = activity;

  // Helper to get the correct button text based on status
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
    // We use React Native Paper's Card component
    <Card style={styles.card} onPress={() => onPress(activity)}>
      {/* 1. HEADER: Icon, Title, and Subtitle (Program) */}
      <Card.Title
        title={title}
        titleNumberOfLines={2} // Prevent long titles from breaking layout
        subtitle={program}
        left={(props) => <ActivityIcon type={activity.type} {...props} />}
      />

      {/* 2. CONTENT: Chips and Specific Details */}
      <Card.Content>
        {/* Status and Tag Chips */}
        <View style={styles.chipContainer}>
          <Chip icon="check-circle" mode="flat" style={styles.statusChip}>
            {status}
          </Chip>
          {tags.slice(0, 2).map((tag) => ( // Show first 2 tags
            <Chip key={tag} mode="outlined" style={styles.tagChip}>
              {tag}
            </Chip>
          ))}
        </View>

        {/* Conditional Details (using our helper) */}
        <View style={styles.detailsContainer}>
          <CardDetails activity={activity} />
        </View>
      </Card.Content>

      {/* 3. ACTIONS: The main "call to action" button */}
      <Card.Actions>
        <Button mode="contained" onPress={() => onPress(activity)}>
          {getActionText()}
        </Button>
      </Card.Actions>
    </Card>
  );
};

// 4. STYLES
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  icon: {
    backgroundColor: 'transparent', // Icon background looks better clear
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
    minHeight: 40, // Give a consistent height even if details are short
  },
  detailText: {
    marginBottom: 4,
  },
});

export default ActivityCard;