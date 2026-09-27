import * as React from "react"
import { cn } from "@/lib/utils"

interface FieldSetProps extends React.HTMLAttributes<HTMLFieldSetElement> {}

const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  ({ className, ...props }, ref) => (
    <fieldset
      ref={ref}
      className={cn("border-0 p-0 m-0", className)}
      {...props}
    />
  )
)
FieldSet.displayName = "FieldSet"

export { FieldSet }
