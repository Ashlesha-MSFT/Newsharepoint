// src/components/Button.tsx
import React from 'react';
import { IButtonProps } from './IButtonProps';  // Import the IButtonProps interface

const Button: React.FC<IButtonProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
  onClick
}) => {
  return (
    <div>
      <button onClick={() => onClick('lineChart')}>Line Chart</button>
      <button onClick={() => onClick('pieChart')}>Pie Chart</button>
      <button onClick={() => onClick('columnChart')}>Column Chart</button>
      <button onClick={() => onClick('scatterPlot')}>Scatter Plot Chart</button>
      <button onClick={() => onClick('areaChart')}>Area Chart</button>
      <button onClick={() => onClick('stackedColumnChart')}>Stacked Column Chart</button>

      <p>{description}</p>
      <p>{isDarkTheme ? 'Dark Theme' : 'Light Theme'}</p>
      <p>{environmentMessage}</p>
      <p>{hasTeamsContext ? 'Teams context available' : 'No Teams context'}</p>
      <p>User: {userDisplayName}</p>
    </div>
  );
};

export default Button;
