// src/components/ButtonWebPart.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { IButtonProps } from './IButtonProps'; // Import the IButtonProps interface
import Button from './Button'; // Assuming Button is in the same directory

const YourWebPart: React.FunctionComponent = () => {
  const history = useHistory();
//   const [chartData, setChartData] = useState({});

  // Handle chart type click and change route accordingly
  const handleChartClick = (chartType: string): void => {
    history.push(`/chart/${chartType}`);
  };

  // Example IButtonProps for passing down to Button component
  const buttonProps: IButtonProps = {
    description: 'Click a button to view a chart',
    isDarkTheme: false,
    environmentMessage: 'You are in development environment',
    hasTeamsContext: true,
    userDisplayName: 'John Doe',
    onClick: handleChartClick,  // Pass the actual handler here
  };

  return (
    <Router>
      <div>
        {/* Render Button with correct props */}
        <Button {...buttonProps} /> 

        <button className="button" onClick={() => handleChartClick('lineChart')}>Line Chart</button>
        <button className="button" onClick={() => handleChartClick('pieChart')}>Pie Chart</button>
        <button className="button" onClick={() => handleChartClick('columnChart')}>Column Chart</button>
        <button className="button" onClick={() => handleChartClick('scatterPlot')}>Scatter Plot Chart</button>
        <button className="button" onClick={() => handleChartClick('areaChart')}>Area Chart</button>
        <button className="button" onClick={() => handleChartClick('stackedColumnChart')}>Stacked Column Chart</button>

        <Switch>
          <Route path="/chart/:chartType" render={({ match }) => (
            <div>
              <h3>Displaying {match.params.chartType} chart</h3>
              {/* Render the corresponding chart here based on the `chartType` */}
            </div>
          )} />
        </Switch>
      </div>
    </Router>
  );
};

export default YourWebPart;
