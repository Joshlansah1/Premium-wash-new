import { Component } from "react";
import { BiHomeAlt2 } from "react-icons/bi";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--white-bg)] text-[var(--text-primary)] px-6 text-center">
          <div className="max-w-xl">
            <h1 className="text-6xl font-extrabold mb-4 text-[var(--primary-color)]">
              Oops!
            </h1>
            <p className="text-xl sm:text-2xl font-semibold mb-2">
              Something got tangled in the wash 🧺
            </p>
            <p className="text-md sm:text-lg mb-6 text-gray-600">
              An unexpected error occurred. Please try again, and if the
              problem persists, contact support.
            </p>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary-color)] text-[var(--text-inverse)] rounded-lg hover:bg-[var(--primary-hover)] transition"
            >
              <BiHomeAlt2 className="text-xl" />
              Go Back Home
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
