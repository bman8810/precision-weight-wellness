"use client";

import {
  useRef,
  useEffect,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {stagger ? applyStagger(children, stagger, visible) : children}
    </div>
  );
}

function applyStagger(
  children: ReactNode,
  stagger: number,
  visible: boolean
) {
  return Children.map(children, (child: ReactNode, i: number) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{
      className?: string;
      style?: Record<string, unknown>;
    }>;
    return cloneElement(el, {
      className: `${el.props.className || ""} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
      style: {
        ...(el.props.style || {}),
        transitionDelay: `${i * stagger}ms`,
      },
    });
  });
}
