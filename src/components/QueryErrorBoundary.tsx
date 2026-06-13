import { Component, type ErrorInfo, type ReactNode } from "react"
import Card from "./cards/Card"

type Props = {
  children: ReactNode
  title: string
}

type State = {
  error: Error | null
}

export default class QueryErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    void error
    void errorInfo
  }

  render() {
    if (!this.state.error) {
      return this.props.children
    }

    return (
      <Card title={this.props.title} childrenClassName="flex items-center">
        <p className="text-sm leading-6 text-muted-foreground">
          {formatErrorMessage(this.state.error)}
        </p>
      </Card>
    )
  }
}

function formatErrorMessage(error: Error) {
  if (error.message.includes("status 401")) {
    return "Weather data is unavailable because the configured OpenWeather key is not authorized for this endpoint. Set a valid key or switch to a supported API plan."
  }

  return error.message || "Something went wrong while loading this section."
}
