/**
 * Haptic Feedback Utilities
 * Provides vibration feedback for mobile devices
 */

// Check if Vibration API is supported
const isVibrationSupported = (): boolean => {
  return "vibrate" in navigator;
};

// Vibration patterns (in milliseconds)
export const HapticPatterns = {
  // Light tap (like clicking a button)
  light: [10],

  // Medium tap (like toggling a switch)
  medium: [20],

  // Heavy tap (like completing an action)
  heavy: [30],

  // Success pattern (double tap)
  success: [15, 50, 15],

  // Error pattern (triple tap)
  error: [10, 50, 10, 50, 10],

  // Notification pattern
  notification: [20, 100, 20],

  // Selection pattern (subtle)
  selection: [5],

  // Impact pattern (strong single tap)
  impact: [40],

  // Warning pattern (increasing intensity)
  warning: [10, 50, 20, 50, 30],
} as const;

/**
 * Trigger haptic feedback with a predefined pattern
 */
export const hapticFeedback = (
  pattern: keyof typeof HapticPatterns | number[]
): boolean => {
  if (!isVibrationSupported()) {
    console.warn("Haptic feedback not supported on this device");
    return false;
  }

  try {
    const vibrationPattern = Array.isArray(pattern)
      ? pattern
      : HapticPatterns[pattern];

    navigator.vibrate(vibrationPattern);
    return true;
  } catch (error) {
    console.error("Failed to trigger haptic feedback:", error);
    return false;
  }
};

/**
 * Cancel ongoing vibration
 */
export const cancelHaptic = (): boolean => {
  if (!isVibrationSupported()) return false;

  try {
    navigator.vibrate(0); // Stop vibration
    return true;
  } catch (error) {
    console.error("Failed to cancel haptic feedback:", error);
    return false;
  }
};

/**
 * Check if device supports haptics
 */
export const hasHapticSupport = (): boolean => {
  return isVibrationSupported();
};

/**
 * Custom hook for haptic feedback in React components
 */
export const useHapticFeedback = () => {
  const triggerHaptic = (pattern: keyof typeof HapticPatterns | number[]) => {
    return hapticFeedback(pattern);
  };

  return {
    haptic: triggerHaptic,
    cancel: cancelHaptic,
    supported: hasHapticSupport(),
  };
};

/**
 * Convenience functions for common interactions
 */
export const haptics = {
  // Button press
  button: () => hapticFeedback("light"),

  // Toggle switch
  toggle: () => hapticFeedback("medium"),

  // Task completion
  success: () => hapticFeedback("success"),

  // Error occurred
  error: () => hapticFeedback("error"),

  // Notification received
  notification: () => hapticFeedback("notification"),

  // Item selected
  selection: () => hapticFeedback("selection"),

  // Strong impact
  impact: () => hapticFeedback("impact"),

  // Warning alert
  warning: () => hapticFeedback("warning"),

  // Custom pattern
  custom: (pattern: number[]) => hapticFeedback(pattern),
};

export default haptics;
