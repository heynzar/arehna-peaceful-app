"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import { ruqaa } from "@/app/font";

export default function Dropdown({
  list,
  type,
  search,
  settings,
  setSettings,
}: {
  type: "quran" | "reciter";
  list: {
    name_ar: string;
    name_en: string;
    query: string;
  }[];
  search?: boolean;
  settings: {
    isHijri: boolean;
    selectedSurah: string;
    selectedReciter: string;
    bg: string;
  };
  setSettings: Dispatch<
    SetStateAction<{
      isHijri: boolean;
      selectedSurah: string;
      selectedReciter: string;
      bg: string;
    }>
  >;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown container
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  function findIndexOfStringInObjectList(
    list: {
      name_ar: string;
      name_en: string;
      query: string;
    }[],
    stringToFind: string
  ): number {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (
        item.name_ar === stringToFind ||
        item.name_en === stringToFind ||
        item.query === stringToFind
      ) {
        return i;
      }
    }
    return 0;
  }

  const i = findIndexOfStringInObjectList(
    list,
    type === "quran" ? settings.selectedSurah : settings.selectedReciter
  );
  const [title, setTitle] = useState<string>(list[i].name_ar);

  const options = list.map(({ name_ar }, index) => `${index + 1}-  ${name_ar}`);
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent shortcuts when typing in the search bar
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (
        searchInputRef.current &&
        document.activeElement === searchInputRef.current
      ) {
        event.stopPropagation(); // Stop the event from propagating
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div
      dir="rtl"
      className={`${ruqaa.className} ${
        search ? "z-[21]" : "z-20"
      } relative w-1/2`}
      ref={dropdownRef}
    >
      {/* Toggle Dropdown */}
      <button
        className="w-full flex items-center text-sm justify-between px-2 py-1 rounded-lg hover:bg-zinc-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="size-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 ${
            search ? "max-h-[180px]" : "max-h-[140px]"
          } overflow-hidden border border-zinc-800 bg-zinc-900 rounded-lg mt-1`}
        >
          {/* Search Bar */}

          {search && (
            <div dir="ltr" className="p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 border border-zinc-800 rounded-md bg-zinc-800 text-white focus:outline-none"
                ref={searchInputRef}
              />
            </div>
          )}
          {/* Options List */}
          <ul
            className={`${
              search ? "max-h-[130px]" : "max-h-[140px]"
            } overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-2 py-1 hover:bg-zinc-800 cursor-pointer"
                >
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (type === "quran") {
                        setTitle(list[parseInt(option) - 1].name_ar);
                        setSettings((prev) => ({
                          ...prev,
                          selectedSurah: list[parseInt(option) - 1].query,
                        }));
                      } else {
                        setTitle(list[parseInt(option) - 1].name_ar);
                        setSettings((prev) => ({
                          ...prev,
                          selectedReciter: list[parseInt(option) - 1].query,
                        }));
                      }
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-2 py-2 text-zinc-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
