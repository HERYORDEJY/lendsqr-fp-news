import React, { type ComponentType, type ReactNode } from 'react';

import CustomErrorFallbackView, {
  type Props as CustomErrorFallbackViewProps,
} from './CustomErrorFallbackView';

export type Props = {
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>;
  CustomErrorFallbackView: ComponentType<CustomErrorFallbackViewProps>;
  onError?: (error: Error, stackTrace: string) => void;
};

type State = { error: Error | null };

export default class CustomErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static defaultProps: {
    CustomErrorFallbackView: ComponentType<CustomErrorFallbackViewProps>;
  } = {
    CustomErrorFallbackView: CustomErrorFallbackView,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info.componentStack);
    }
  }

  resetError: () => void = () => {
    this.setState({ error: null });
  };

  render() {
    const { CustomErrorFallbackView } = this.props;

    return this.state.error ? (
      <CustomErrorFallbackView
        error={this.state.error}
        resetError={this.resetError}
      />
    ) : (
      this.props.children
    );
  }
}
