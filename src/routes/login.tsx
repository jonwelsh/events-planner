import { createFileRoute } from '@tanstack/react-router'
import { Login as LoginComp } from '~/components/Login'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  return <LoginComp />
}
