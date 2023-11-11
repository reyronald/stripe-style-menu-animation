import { forwardRef } from "react";

export const Pricing = forwardRef<HTMLDivElement>(function Pricing(
  _props,
  ref
) {
  return (
    <div ref={ref} style={{ padding: "16px 32px" }}>
      Pricing
    </div>
  );
});
