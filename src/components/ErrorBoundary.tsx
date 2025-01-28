import { Component, ErrorInfo } from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string | null;
}

class ErrorBoundary extends Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false, errorMessage: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render shows the fallback UI
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log the error to an error reporting service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        const { hasError, errorMessage } = this.state;

        if (hasError) {
            // Render fallback UI
            return (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                    <h2 className="text-lg font-bold">خطایی رخ داده است</h2>
                    <p>{errorMessage || "لطفاً مجدداً تلاش کنید."}</p>
                </div>
            );
        }

        // Render child components
        return this.props.children;
    }
}

export default ErrorBoundary;
