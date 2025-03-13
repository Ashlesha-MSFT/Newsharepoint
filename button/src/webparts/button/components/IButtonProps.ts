// src/components/IButtonProps.ts
export interface IButtonProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  onClick: (chartType: string) => void; // Add the onClick handler
}
