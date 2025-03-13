import * as React from 'react';
import { AadHttpClient, HttpClientResponse, AadHttpClientFactory } from '@microsoft/sp-http';

// Define the props interface with the correct type for aadHttpClientFactory
export interface IAadHttpClientWebPartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  aadHttpClientFactory: AadHttpClientFactory; // Specify the correct type for the context
}

interface IState {
  data: any;
  error: string;
}

export default class AadHttpClientWebPart extends React.Component<IAadHttpClientWebPartProps, IState> {
  constructor(props: IAadHttpClientWebPartProps) {
    super(props);
    this.state = {
      data: null,
      error: ''
    };
  }

  // Method to fetch data using AadHttpClient
  private async _fetchData(): Promise<void> {  // Make the method async
    const { aadHttpClientFactory } = this.props;  // Access it from props

    if (!aadHttpClientFactory) {
      console.error("aadHttpClientFactory is undefined");
      return;
    }

    try {
      const client: AadHttpClient = await aadHttpClientFactory.getClient('https://graph.microsoft.com'); // Await the promise to resolve
      const response: HttpClientResponse = await client.get('https://graph.microsoft.com/v1.0/me', AadHttpClient.configurations.v1); // Await the response

      if (response.ok) {
        const data = await response.json();  // Await the json() call
        console.log('Fetched data:', data);
        this.setState({ data: data });
      } else {
        console.error('Request failed:', response.statusText);
        this.setState({ error: 'Request failed: ' + response.statusText });
      }
    } catch (error) {
      console.error('Error during the request', error);
      this.setState({ error: 'Error during the request' });
    }
  }

  public render(): React.ReactElement<IAadHttpClientWebPartProps> {
    const { description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = this.props;
    const { data, error } = this.state;

    return (
      <div>
        <h3>{description}</h3>
        <p>{`Theme: ${isDarkTheme ? 'Dark' : 'Light'}`}</p>
        <p>{`Environment: ${environmentMessage}`}</p>
        <p>{`Teams Context: ${hasTeamsContext ? 'Yes' : 'No'}`}</p>
        <p>{`User: ${userDisplayName}`}</p>
        
        <button onClick={this._fetchData}>Fetch Data</button>
        
        {data && (
          <div>
            <h4>Fetched Data:</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        
        {error && (
          <div>
            <h4>Error:</h4>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    );

  }
}
