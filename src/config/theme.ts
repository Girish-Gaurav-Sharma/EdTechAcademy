// src/config/theme.ts
import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';

const palette = {
    navy: '#0B3D91', 
    navyLight: '#2C5FBF',
    black: '#000000',
    offWhite: '#F8FAFC',
    white: '#FFFFFF',
    charcoal900: '#111827',
    charcoal800: '#1F2937',
    charcoal700: '#374151',
    gray300: '#D1D5DB',
    gray200: '#E5E7EB',
    gray150: '#EAECEF',
};

export const lightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        primary: palette.navy,
        onPrimary: palette.white,
        background: palette.offWhite,
        onBackground: '#1F2937', 
        surface: palette.white,
        onSurface: '#111827',
        surfaceVariant: palette.gray150,
        onSurfaceVariant: '#4B5563',
        outline: palette.gray300,
        outlineVariant: palette.gray200,
        secondary: palette.charcoal700,
        onSecondary: palette.white,
        primaryContainer: '#E6EEFA',
        onPrimaryContainer: palette.navy,
        secondaryContainer: '#E9EEF5',
        onSecondaryContainer: '#1F2937',
        elevation: {
            level0: 'transparent',
            level1: '#FFFFFF',
            level2: '#FCFCFD',
            level3: '#FAFAFA',
            level4: '#F7F7F7',
            level5: '#F5F5F5',
        },
    },
    
    fonts: {
        ...DefaultLightTheme.fonts,
        headlineMedium: {
            ...DefaultLightTheme.fonts.headlineMedium,
            fontWeight: '700',
        },
        titleMedium: {
            ...DefaultLightTheme.fonts.titleMedium,
            fontWeight: '600',
        },
        labelLarge: {
            ...DefaultLightTheme.fonts.labelLarge,
            fontWeight: '600',
        },
        bodyLarge: {
            ...DefaultLightTheme.fonts.bodyLarge,
            lineHeight: (DefaultLightTheme.fonts.bodyLarge?.lineHeight as number | undefined) ?? 24,
        },
    },
} as const;

export const darkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        primary: palette.navyLight, 
        onPrimary: palette.white,
        background: palette.black,
        onBackground: palette.gray200,
        surface: palette.charcoal900,
        onSurface: palette.gray200,
        surfaceVariant: palette.charcoal800,
        onSurfaceVariant: '#9CA3AF',
        outline: '#3F3F46',
        outlineVariant: '#27272A',
        secondary: '#94A3B8',
        onSecondary: palette.black,
        primaryContainer: '#0F2F6F',
        onPrimaryContainer: '#DCE8FF',
        secondaryContainer: '#232B36',
        onSecondaryContainer: '#E5E7EB',
        elevation: {
            level0: 'transparent',
            level1: '#111827',
            level2: '#0F172A',
            level3: '#0B1220',
            level4: '#0A0F1A',
            level5: '#090E19',
        },
    },
    fonts: {
        ...DefaultDarkTheme.fonts,
        headlineMedium: {
            ...DefaultDarkTheme.fonts.headlineMedium,
            fontWeight: '700',
        },
        titleMedium: {
            ...DefaultDarkTheme.fonts.titleMedium,
            fontWeight: '600',
        },
        labelLarge: {
            ...DefaultDarkTheme.fonts.labelLarge,
            fontWeight: '600',
        },
        bodyLarge: {
            ...DefaultDarkTheme.fonts.bodyLarge,
            lineHeight: (DefaultDarkTheme.fonts.bodyLarge?.lineHeight as number | undefined) ?? 24,
        },
    },
} as const;

export type AppTheme = typeof lightTheme;
