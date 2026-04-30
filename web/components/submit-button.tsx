'use client'

import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  idleLabel: string
  pendingLabel?: string
  className?: string
  title?: string
  ariaLabel?: string
  confirmMessage?: string
}

export default function SubmitButton({
  idleLabel,
  pendingLabel = 'Saving...',
  className,
  title,
  ariaLabel,
  confirmMessage,
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (confirmMessage && !window.confirm(confirmMessage)) {
          e.preventDefault()
        }
      }}
      className={`${className || ''} ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
      title={title}
      aria-label={ariaLabel}
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  )
}
