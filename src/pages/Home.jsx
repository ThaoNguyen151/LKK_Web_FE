import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@components/ui'
import { Container } from '@layouts'

export function Home() {
  return (
    <Container>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Welcome to LKK Web
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          A modern React application built with Vite and Tailwind CSS
        </p>
        <div className="mb-12 flex justify-center gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Fast Development</CardTitle>
            <CardDescription>
              Built with Vite for lightning-fast HMR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Experience instant feedback during development with Vite&apos;s
              optimized build tool.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modern Styling</CardTitle>
            <CardDescription>Powered by Tailwind CSS</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Utility-first CSS framework for rapid UI development with
              consistent design.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Type Safe</CardTitle>
            <CardDescription>Path aliases configured</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Clean imports with path aliases for better code organization and
              maintainability.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
