import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <p className="error-boundary-icon">⚠️</p>
                    <h2>페이지를 불러오는 중 오류가 발생했습니다</h2>
                    <button
                        className="retry-btn"
                        onClick={() => window.location.reload()}
                    >
                        새로고침
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
