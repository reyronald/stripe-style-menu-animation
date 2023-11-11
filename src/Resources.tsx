import { forwardRef } from "react";
import "./Resources.css";

export const Resources = forwardRef<HTMLDivElement>(function Resources(
  _props,
  ref
) {
  return (
    <div ref={ref} className="Resources">
      <div className="Resources__top">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        delectus maxime illum ratione dignissimos pariatur fugit nesciunt
        tempora cupiditate repudiandae. Sint quo consequatur, officiis
        blanditiis dolor vero numquam debitis dicta?
      </div>

      <div className="Resources__bottom">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        delectus maxime illum ratione dignissimos pariatur fugit nesciunt
        tempora cupiditate repudiandae. Sint quo consequatur, officiis
        blanditiis dolor vero numquam debitis dicta?
      </div>
    </div>
  );
});
