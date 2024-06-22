// ErrorBoundary.jsx
import React, { Component } from 'react';
import '../index.css'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 className='text-9xl font-bold'>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}