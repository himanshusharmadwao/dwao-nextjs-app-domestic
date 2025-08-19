import { useEffect, useMemo, useRef, useState } from "react";
import countryCodes from "@/data/country-code/country-code.json";

export default function CountryCodeSelect({
    name = "countryCode",
    id = "countryCode",
    value,
    onChange,
    className = "w-full px-4 py-2 border border-[#e4e4e4] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder = "Search country or code…",
}) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [highlight, setHighlight] = useState(0);
    const btnRef = useRef(null);
    const listRef = useRef(null);

    // Filtered list according to query
    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return countryCodes;
        return countryCodes.filter((c) =>
            (c.name || "").toLowerCase().includes(s) ||
            (c.code || "").toLowerCase().includes(s) ||
            (c.dial_code || "").toLowerCase().includes(s.replace(/^(\+)?/, "+"))
        );
    }, [q]);

    // Close dropdown on outside click or ESC
    useEffect(() => {
        function onDocClick(e) {
            if (
                btnRef.current &&
                !btnRef.current.contains(e.target) &&
                listRef.current &&
                !listRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        }
        function onEsc(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    // Reset highlight when dropdown opens
    useEffect(() => {
        if (open) setHighlight(0);
    }, [open, q]);

    function commitSelection(item) {
        onChange?.({ target: { name, id, value: item.dial_code } });
        setOpen(false);
    }

    function onKeyDown(e) {
        if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(true);
            return;
        }
        if (!open) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[highlight]) commitSelection(filtered[highlight]);
        } else if (e.key === "Home") {
            e.preventDefault();
            setHighlight(0);
        } else if (e.key === "End") {
            e.preventDefault();
            setHighlight(filtered.length - 1);
        }
    }

    const selected = countryCodes.find((c) => c.dial_code === value);

    return (
        <div className="relative">
            <button
                type="button"
                ref={btnRef}
                id={id}
                name={name}
                className={`${className} text-left flex items-center justify-between`}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={onKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="truncate">
                    {selected
                        ? `${selected.dial_code} (${selected.code})`
                        : "Select country code"}
                </span>
                <svg
                    className="ml-2 h-4 w-4 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                </svg>
            </button>

            {open && (
                <div
                    ref={listRef}
                    className="absolute z-50 mt-2 w-full bg-white border border-[#e4e4e4] rounded-lg shadow-md"
                    role="listbox"
                    tabIndex={-1}
                    onKeyDown={onKeyDown}
                >
                    <div className="p-2 border-b border-[#e4e4e4]">
                        <input
                            autoFocus
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder={placeholder}
                            className="w-full px-3 py-2 text-gray-500 border border-[#e4e4e4] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <ul className="max-h-40 overflow-y-auto hide-scrollbar">
                        {filtered.length === 0 && (
                            <li className="px-3 py-2 text-gray-500">No matches</li>
                        )}
                        {filtered.map((item, idx) => {
                            const isActive = idx === highlight;
                            const isSelected = item.dial_code === value;
                            return (
                                <li
                                    key={`${item.code}-${item.dial_code}`}
                                    role="option"
                                    aria-selected={isSelected}
                                    onMouseEnter={() => setHighlight(idx)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => commitSelection(item)}
                                    className={`px-3 py-2 cursor-pointer text-gray-700 flex items-center justify-between ${
                                        isActive ? "bg-blue-50" : ""
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="truncate w-full">
                                            {item.name}
                                        </span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
