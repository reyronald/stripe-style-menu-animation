import { forwardRef } from "react";
import "./Developers.css";

export const Developers = forwardRef<HTMLDivElement>(function Developers(
  _props,
  ref
) {
  return (
    <div ref={ref} className="Developers">
      <div className="Developers__left-pane">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        officiis voluptatum fugit dolorem omnis quasi aliquid et, eius
        necessitatibus esse? Architecto inventore, quaerat quis molestiae iure
        esse aut impedit sequi?
      </div>

      <div className="Developers__right-pane">
        <div>
          <strong>Global Payments</strong> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          cupiditate possimus repudiandae
        </div>
        <div>
          <strong>Global Payments</strong> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          cupiditate possimus repudiandae
        </div>
        <div>
          <strong>Global Payments</strong> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          cupiditate possimus repudiandae
        </div>
      </div>
    </div>
  );
});
