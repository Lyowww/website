"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type FormDropdownProps = {
  name: string;
  label: string;
  options: string[];
  placeholder: string;
};

export function FormDropdown({ name, label, options, placeholder }: FormDropdownProps) {
  const id = useId();
  const listId = `${id}-list`;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [moreBelow, setMoreBelow] = useState(false);

  const syncScrollHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = el;
    const hasOverflow = scrollHeight > clientHeight + 2;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 6;
    setMoreBelow(hasOverflow && !nearBottom);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const closeOnOutside = (event: MouseEvent | PointerEvent) => {
      const node = containerRef.current;
      if (node && !node.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => syncScrollHint());
    const el = scrollRef.current;
    const ro = new ResizeObserver(() => syncScrollHint());

    if (el) {
      ro.observe(el);
    }

    window.addEventListener("resize", syncScrollHint);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", syncScrollHint);
    };
  }, [open, options.length, placeholder, syncScrollHint]);

  const display = selected || placeholder;
  const displayMuted = !selected;

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selected} />
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-cyan-glow/68" id={`${id}-label`}>
        {label}
      </span>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((value) => !value)}
        className={`field-input flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition ${
          displayMuted ? "text-cream-100/48" : "text-cream-100/88"
        } ${open ? "border-cyan-glow/58 shadow-[0_0_0_4px_rgba(124,231,247,0.08)]" : ""}`}
      >
        <span className="min-w-0 flex-1 truncate">{display}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-cyan-glow/75 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={listId}
            role="listbox"
            aria-labelledby={`${id}-label`}
            data-lenis-prevent-wheel
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-white/12 bg-ink-900/96 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <div
              ref={scrollRef}
              onScroll={syncScrollHint}
              className="form-dropdown-scroll max-h-[min(12.25rem,50vh)] overflow-y-scroll overscroll-contain py-1 pl-1 pr-0"
            >
              <button
                type="button"
                role="option"
                aria-selected={selected === ""}
                className="flex min-h-11 w-full px-3 py-2.5 text-left text-sm leading-snug text-cream-100/45 transition hover:bg-white/[0.06] hover:text-cream-100/75 sm:px-4 sm:py-3"
                onClick={() => {
                  setSelected("");
                  setOpen(false);
                }}
              >
                {placeholder}
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected === option}
                  className={`flex min-h-11 w-full px-3 py-2.5 text-left text-sm leading-snug transition hover:bg-white/[0.06] sm:px-4 sm:py-3 ${
                    selected === option ? "bg-cyan-glow/10 text-cyan-glow" : "text-cream-100/82"
                  }`}
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            {moreBelow ? (
              <>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-11 rounded-b-[inherit] bg-gradient-to-t from-ink-900 from-40% via-ink-900/75 to-transparent"
                  aria-hidden
                />
                <ChevronDown
                  className="pointer-events-none absolute bottom-1 left-1/2 z-[2] size-4 -translate-x-1/2 text-cyan-glow/55"
                  aria-hidden
                  strokeWidth={2.25}
                />
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
