// src/shared/components/Chip/BrandedChip.tsx
import React from 'react';
import { Chip, ChipProps, useTheme } from 'react-native-paper';

type Props = ChipProps & {
  // no extra props, wrapper to enforce consistent styling
};

export const BrandedChip: React.FC<Props> = ({ selected, mode, style, textStyle, ...rest }) => {
  const { colors } = useTheme();

  const isSelected = !!selected;
  const bg = isSelected ? colors.primary : colors.surfaceVariant;
  const fg = isSelected ? colors.onPrimary : colors.onSurfaceVariant;
  const borderColor = isSelected ? 'transparent' : colors.outline;

  return (
    <Chip
      selected={isSelected}
      mode={isSelected ? 'flat' : 'outlined'}
      style={[{ backgroundColor: bg, borderColor }, style]}
      textStyle={[{ color: fg }, textStyle]}
      selectedColor={fg}
      {...rest}
    />
  );
};

export default BrandedChip;
