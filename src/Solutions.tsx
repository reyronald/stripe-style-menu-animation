import { forwardRef } from "react";
import "./Solutions.css";

export const Solutions = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  function Solutions(_props, ref) {
    return (
      <div ref={ref} className="Solutions">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
      </div>
    );
  }
);
