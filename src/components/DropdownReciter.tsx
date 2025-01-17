"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { ruqaa } from "@/app/font";

export default function DropdownReciter({
  list,
  toggleAudio,
  loadingStates,
  selecedOption,
  setSelecedOption,
}: {
  toggleAudio: (src: string) => void;
  list: {
    name_ar: string;
    name_en: string;
    query: string;
  }[];
  selecedOption: {
    isHijri: boolean;
    selectedSurah: string;
    selectedReciter: string;
    bg: string;
  };
  setSelecedOption: Dispatch<
    SetStateAction<{
      isHijri: boolean;
      selectedSurah: string;
      selectedReciter: string;
      bg: string;
    }>
  >;
  loadingStates: { [key: string]: boolean };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    return -1;
  }

  const reciterIndex = findIndexOfStringInObjectList(
    list,
    selecedOption.selectedReciter
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const options = list.map(({ name_ar }, index) => `${index + 1}-  ${name_ar}`);
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAudioSrc = `${selecedOption.selectedReciter}/${selecedOption.selectedSurah}.mp3`;
  const isCurrentlyLoading = loadingStates[currentAudioSrc];

  const handleReciterSelect = (index: number) => {
    const newReciter = list[index].query;
    const newAudioSrc = `${newReciter}/${selecedOption.selectedSurah}.mp3`;

    setIsOpen(false);
    setSelecedOption((prevState) => ({
      ...prevState,
      selectedReciter: newReciter,
    }));
    toggleAudio(newAudioSrc);
  };

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

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (
        searchInputRef.current &&
        document.activeElement === searchInputRef.current
      ) {
        event.stopPropagation();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div dir="rtl" className="relative w-1/2 z-10" ref={dropdownRef}>
      <button
        className={`w-full flex items-center text-sm justify-between px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900 hover:bg-zinc-800 ${
          isCurrentlyLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
        onClick={() => !isCurrentlyLoading && setIsOpen(!isOpen)}
        disabled={isCurrentlyLoading}
      >
        <span className={`${ruqaa.className} flex items-center gap-2`}>
          {list[reciterIndex].name_ar}
        </span>
        <ChevronDown className={isCurrentlyLoading ? "opacity-50" : ""} />
      </button>

      {isOpen && !isCurrentlyLoading && (
        <div className="absolute left-0 right-0 max-h-[200px] overflow-hidden border border-zinc-800 bg-zinc-900 rounded-lg mt-1">
          <div dir="ltr" className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm px-2 py-1 border border-zinc-800 rounded-md bg-zinc-800 text-white focus:outline-none"
              ref={searchInputRef}
            />
          </div>

          <ul className="max-h-[150px] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const newReciter = list[index].query;
                const audioSrc = `${newReciter}/${selecedOption.selectedSurah}.mp3`;
                const isOptionLoading = loadingStates[audioSrc];
                const isSelected = reciterIndex === index;

                return (
                  <li
                    key={index}
                    className={`${ruqaa.className} ${
                      isSelected ? "bg-sky-500" : "hover:bg-zinc-800"
                    } px-2 py-2 cursor-pointer text-sm flex items-center justify-between transition-colors duration-200`}
                    onClick={() =>
                      !isOptionLoading &&
                      handleReciterSelect(parseInt(option) - 1)
                    }
                  >
                    <span>{option}</span>
                    {isOptionLoading && (
                      <Loader2 className="animate-spin h-4 w-4" />
                    )}
                  </li>
                );
              })
            ) : (
              <li className="px-2 py-2 text-zinc-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
