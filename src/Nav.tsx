import clsx from "clsx";
import { useState, useRef } from "react";
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import "./Nav.css";
import { Developers } from "./Developers";
import { Pricing } from "./Pricing";
import { Products } from "./Products";
import { Resources } from "./Resources";
import { Solutions } from "./Solutions";
import { Portal } from "@reach/portal";

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
    | {
        item: null;
        offsetLeft?: number;
        offsetTop?: number;
        offsetWidth?: number;
        offsetHeight?: number;
      }
    | {
        item: MenuItem;
        offsetLeft: number;
        offsetTop: number;
        offsetWidth: number;
        offsetHeight: number;
      }
  >({
    item: null,
  });
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const closeMenu = () => {
    setState((prev) => ({ ...prev, item: null }));
  };

  const getOnMouseProps = (item: MenuItem) => {
    const openMenu = (buttonEl: HTMLElement) => {
      const menuEl = refs.current[item];
      setState({
        item,
        offsetLeft:
          buttonEl.offsetLeft -
          (menuEl?.offsetWidth ?? 0) / 2 +
          (buttonEl?.offsetWidth ?? 0) / 2,
        offsetTop: buttonEl.offsetTop + buttonEl.offsetHeight + 16,
        offsetWidth: menuEl?.offsetWidth || 0,
        offsetHeight: menuEl?.offsetHeight || 0,
      });
    };

    const onMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
      openMenu(e.currentTarget);
    };
    const onClick: MouseEventHandler<HTMLElement> = (e) => {
      openMenu(e.currentTarget);
    };
    const onFocus: FocusEventHandler<HTMLElement> = (e) => {
      openMenu(e.currentTarget);
    };

    const onBlur: FocusEventHandler<HTMLElement> = () => {
      closeMenu();
    };

    return { onMouseEnter, onClick, onFocus, onBlur };
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = () => {
    closeMenu();
  };
  const onKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.code === "Escape") closeMenu();
  };

  return (
    <>
      <div onMouseLeave={onMouseLeave} onKeyDown={onKeyDown}>
        <nav className="Nav">
          <ul>
            <li>
              <button {...getOnMouseProps("Products")}>Products</button>
            </li>
            <li>
              <button {...getOnMouseProps("Solutions")}>Solutions</button>
            </li>
            <li>
              <button {...getOnMouseProps("Developers")}>Developers</button>
            </li>
            <li>
              <button {...getOnMouseProps("Resources")}>Resources</button>
            </li>
            <li>
              <button {...getOnMouseProps("Pricing")}>Pricing</button>
            </li>
          </ul>
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button>Some other interactive element on the page</button>
          <button>Some other interactive element on the page</button>
          <button>Some other interactive element on the page</button>
        </div>

        <div style={{ textAlign: "left", marginTop: "16rem" }}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>

      <Portal type="overlay-container">
        <div
          className={clsx(
            "overlay absolute transition-all",
            state.item ? "opacity-100" : "opacity-0"
          )}
          style={{
            left: state.offsetLeft,
            top: state.offsetTop,
            width: state.offsetWidth,
            height: state.offsetHeight,
          }}
        >
          <SlideWrapper item="Products" visibleItem={state.item}>
            <Products ref={(el) => (refs.current["Products"] = el)} />
          </SlideWrapper>
          <SlideWrapper item="Solutions" visibleItem={state.item}>
            <Solutions
              ref={(el) => (refs.current["Solutions"] = el)}
              isVisible={state.item === "Solutions"}
            />
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
      </Portal>
    </>
  );
}

const SlideWrapper = ({
  item,
  visibleItem,
  children,
}: PropsWithChildren<{ item: MenuItem; visibleItem: MenuItem | null }>) => {
  const order = menuItemOrder.indexOf(item);
  const orderVisible = visibleItem ? menuItemOrder.indexOf(visibleItem) : null;
  const isVisible = item === visibleItem;

  return (
    <div
      className={clsx(
        "absolute",
        "transition-all",
        isVisible ? "opacity-100" : "opacity-0",
        orderVisible != null && order > orderVisible && "x-transform-24",
        orderVisible != null && order < orderVisible && "-x-transform-24"
      )}
      style={{
        minWidth: "max-content",
      }}
      ref={(el) => {
        // https://github.com/facebook/react/issues/17157
        if (isVisible) el?.removeAttribute("inert");
        else el?.setAttribute("inert", "true");
      }}
    >
      {children}
    </div>
  );
};
