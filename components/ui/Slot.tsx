import * as React from "react";

interface SlotProps extends React.SlotHTMLAttributes<HTMLSlotElement> {}

const Slot = React.forwardRef<HTMLSlotElement, SlotProps>(
  ({ ...props }, ref) => {
    return <slot ref={ref} {...props} />;
  }
);
Slot.displayName = "Slot"; // for easy identification of errors during eslint

export default Slot;
