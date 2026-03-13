import { Card, CardHeader, CardTitle, CardContent } from '@components/ui'
import { Container } from '@layouts'

export function About() {
  return (
    <Container>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">About Us</h1>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            We are committed to building modern, scalable, and performant web
            applications that deliver exceptional user experiences.
          </p>
          <p className="text-gray-600">
            This project demonstrates best practices in React development,
            including proper project structure, code quality tools, and modern
            styling approaches.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• React 19 - UI Library</li>
              <li>• Vite - Build Tool</li>
              <li>• Tailwind CSS - Styling</li>
              <li>• ESLint & Prettier - Code Quality</li>
              <li>• Husky - Git Hooks</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Path Aliases</li>
              <li>• Pre-commit Hooks</li>
              <li>• Component Library</li>
              <li>• Responsive Design</li>
              <li>• Modern Tooling</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
