// src/config/theme.ts
// Centralized theme configuration using React Native Paper MD3 theme as a base
import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';

// Professional palette tokens
// Core hues inspired by: Navy Blue, Black, Charcoal Gray, White/Off-white
const palette = {
    navy: '#0B3D91', // primary brand
    navyLight: '#2C5FBF',
    black: '#000000',
    offWhite: '#F8FAFC', // very light off-white for backgrounds
    white: '#FFFFFF',
    charcoal900: '#111827', // deepest charcoal for dark surfaces
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
        // Brand
        primary: palette.navy,
        onPrimary: palette.white,

        // App surfaces
        background: palette.offWhite,
        onBackground: '#1F2937', // charcoal-800 for readable text
        surface: palette.white,
        onSurface: '#111827', // charcoal-900 for prominent text
        surfaceVariant: palette.gray150,
        onSurfaceVariant: '#4B5563', // muted charcoal

        // Outlines / dividers
        outline: palette.gray300,
        outlineVariant: palette.gray200,

        // Other slots Paper/MD3 may use
        secondary: palette.charcoal700,
        onSecondary: palette.white,
        // MD3 container roles (used by components such as Chips/Buttons in certain modes)
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
    // Subtle typography enhancements for a cleaner, more confident look
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
        // Brand
        primary: palette.navyLight, // a slightly brighter navy for dark backgrounds
        onPrimary: palette.white,

        // App surfaces (lean into black and charcoals)
        background: palette.black,
        onBackground: palette.gray200,
        surface: palette.charcoal900,
        onSurface: palette.gray200,
        surfaceVariant: palette.charcoal800,
        onSurfaceVariant: '#9CA3AF',

        // Outlines / dividers
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
    // Mirror the font emphasis in dark mode
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
