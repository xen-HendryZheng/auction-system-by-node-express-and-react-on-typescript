import { useState } from 'react'
import { Alert } from 'react-bootstrap'

interface AlertProps {
  variant: 'success' | 'danger' | 'warning' | 'info' | string
  message: string | undefined
}
export default function AlertMsg ({ variant, message }: AlertProps) {
  const [show, setShow] = useState(true)

  if (!variant || !message) {
    return null
  }

  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  )
}
