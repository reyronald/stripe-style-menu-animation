import clsx from "clsx";
import { forwardRef, useState, useRef } from "react";
import type { MouseEventHandler, PropsWithChildren } from "react";
import "./Nav.css";

type MenuItem =
  | "Products"
  | "Solutions"
  | "Developers"
  | "Resources"
  | "Pricing";

const menuItemOrder = [
  "Products",
  "Solutions",
  "Developers",
  "Resources",
  "Pricing",
] as const;

export function Nav() {
  const [state, setState] = useState<
    | { item: null }
    | {
        item: MenuItem;
        offsetLeft: number;
        offsetWidth: number;
        offsetHeight: number;
      }
  >({
    item: null,
  });
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getOnMouseProps = (item: MenuItem) => {
    const onMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
      const menuEl = refs.current[item];
      setState({
        item,
        offsetLeft: e.currentTarget.offsetLeft,
        offsetWidth: menuEl?.offsetWidth || 0,
        offsetHeight: menuEl?.offsetHeight || 0,
      });
    };

    return { onMouseEnter };
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = () => {
    setState({ item: null });
  };

  return (
    <div onMouseLeave={onMouseLeave}>
      <nav className="Nav">
        <ul>
          <li {...getOnMouseProps("Products")}>Products</li>
          <li {...getOnMouseProps("Solutions")}>Solutions</li>
          <li {...getOnMouseProps("Developers")}>Developers</li>
          <li {...getOnMouseProps("Resources")}>Resources</li>
          <li {...getOnMouseProps("Pricing")}>Pricing</li>
        </ul>
      </nav>

      <div
        className={clsx(
          "overlay",
          state.item ? "opacity-100" : "opacity-0 visibility-hidden",
        )}
        style={
          state.item
            ? {
                left: state.offsetLeft - state.offsetWidth / 2,
                width: state.offsetWidth,
                height: state.offsetHeight,
              }
            : {}
        }
      >
        <SlideWrapper item="Products" visibleItem={state.item}>
          <Products ref={(el) => (refs.current["Products"] = el)} />
        </SlideWrapper>
        <SlideWrapper item="Solutions" visibleItem={state.item}>
          <Solutions ref={(el) => (refs.current["Solutions"] = el)} />
        </SlideWrapper>
        <SlideWrapper item="Developers" visibleItem={state.item}>
          <Developers ref={(el) => (refs.current["Developers"] = el)} />
        </SlideWrapper>
        <SlideWrapper item="Resources" visibleItem={state.item}>
          <Resources ref={(el) => (refs.current["Resources"] = el)} />
        </SlideWrapper>
        <SlideWrapper item="Pricing" visibleItem={state.item}>
          <Pricing ref={(el) => (refs.current["Pricing"] = el)} />
        </SlideWrapper>
      </div>

      <div style={{ textAlign: "left", marginTop: "36rem" }}>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

const SlideWrapper = ({
  item,
  visibleItem,
  children,
}: PropsWithChildren<{ item: MenuItem; visibleItem: MenuItem | null }>) => {
  const order = menuItemOrder.indexOf(item);
  const orderVisible = visibleItem ? menuItemOrder.indexOf(visibleItem) : -1;

  return (
    <div
      className={clsx(
        "absolute",
        item === visibleItem ? "opacity-100" : "opacity-0",
        order > orderVisible && "x-transform-24",
        order < orderVisible && "-x-transform-24",
      )}
      style={{
        minWidth: "max-content",
      }}
    >
      {children}
    </div>
  );
};

const Products = forwardRef<HTMLDivElement>(function Products(_props, ref) {
  return <div ref={ref}>Products {lines(3, 1)}</div>;
});
const Solutions = forwardRef<HTMLDivElement>(function Solutions(_props, ref) {
  return <div ref={ref}>Solutions {lines(8, 10)}</div>;
});
const Developers = forwardRef<HTMLDivElement>(function Developers(_props, ref) {
  return <div ref={ref}>Developers {lines(5, 25)}</div>;
});
const Resources = forwardRef<HTMLDivElement>(function Resources(_props, ref) {
  return <div ref={ref}>Resources {lines(7, 7)}</div>;
});
const Pricing = forwardRef<HTMLDivElement>(function Pricing(_props, ref) {
  return <div ref={ref}>Pricing {lines(2, 12)}</div>;
});

const lines = (n: number, chars: number) => {
  const arr = (length: number) => Array(length).fill(null);

  return arr(n).map((_, i) => (
    <div key={i}>
      Line {i} - {arr(chars).map((_, j) => j)}{" "}
    </div>
  ));
};
