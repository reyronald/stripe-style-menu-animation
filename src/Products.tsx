import { forwardRef } from "react";

import "./Products.css";

export const Products = forwardRef<HTMLDivElement>(function Products(
  _props,
  ref
) {
  return (
    <div ref={ref} className="Products">
      <div className="Products__left-pane">
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

      <div className="Products__right-pane">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        officiis voluptatum fugit dolorem omnis quasi aliquid et, eius
        necessitatibus esse? Architecto inventore, quaerat quis molestiae iure
        esse aut impedit sequi?
      </div>
    </div>
  );
});
