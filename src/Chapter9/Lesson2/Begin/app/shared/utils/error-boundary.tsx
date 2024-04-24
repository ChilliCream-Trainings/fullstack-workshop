import React from "react";

type State = { error?: Error; refetch: number };
type Props = { children: React.ReactNode };

export class ErrorBoundary extends React.Component<Props, State> {
  state = { error: undefined, refetch: 0 };
  static getDerivedStateFromError(error: Error): State {
    // Set some state derived from the caught error
    return { error: error, refetch: 0 };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong, reload the page.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
