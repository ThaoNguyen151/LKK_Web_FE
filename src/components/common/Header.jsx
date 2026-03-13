import { APP_NAME } from '@utils'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
