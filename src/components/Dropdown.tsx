"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { ruqaa } from "@/app/font";

export default function Dropdown({
  title,
  list,
  type,
  selectQuran,
  setSelectQuran,
  toggleAudio,
}: {
  title: string;
  type: "quran" | "reciter";
  toggleAudio: (src: string) => void;
  list: {
    name_ar: string;
    name_en: string;
    query: string;
  }[];
  selectQuran: {
    selectedSurah: string;
    selectedReciter: string;
  };
  setSelectQuran: (
    value: SetStateAction<{
      selectedSurah: string;
      selectedReciter: string;
    }>
  ) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [_title, setTitle] = useState(title);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown container
  const searchInputRef = useRef<HTMLInputElement | null>(null); // Ref for the search input

  const options = list.map(({ name_ar }, index) => `${index + 1}-  ${name_ar}`);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(options);
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
    <div className="relative w-1/2" ref={dropdownRef}>
      {/* Toggle Dropdown */}
      <button
        className="w-full flex items-center text-sm justify-between px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900 hover:bg-zinc-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{_title}</span>
        <ChevronDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 max-h-[200px] overflow-hidden border border-zinc-800 bg-zinc-900 rounded-lg mt-1">
          {/* Search Bar */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm px-2 py-1 border border-zinc-800 rounded-md bg-zinc-800 text-white focus:outline-none"
              ref={searchInputRef}
            />
          </div>

          {/* Options List */}
          <ul
            dir="rtl"
            className="max-h-[150px] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`${ruqaa.className} ${
                    option === _title
                      ? "bg-sky-500 hover:bg-sky-400"
                      : "hover:bg-zinc-800"
                  }  px-2 py-2  cursor-pointer text-sm`}
                  onClick={() => {
                    setTitle(option);
                    setIsOpen(false);
                    if (type === "quran") {
                      setSelectQuran((prevState) => ({
                        ...prevState,
                        selectedSurah: list[index].query,
                      }));
                    } else {
                      setSelectQuran((prevState) => ({
                        ...prevState,
                        selectedReciter: list[index].query,
                      }));
                    }
                    toggleAudio(
                      `${selectQuran.selectedReciter}/${selectQuran.selectedSurah}.mp3`
                    );
                  }}
                >
                  {option}
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
