"use client";

import { ChevronDown, Loader2, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { ruqaa } from "@/app/font";

export default function DropdownQuran({
  list,
  toggleAudio,
  restartAudio,
  loadingStates,
  selecedOption,
  setSelecedOption,
}: {
  selecedOption: {
    isHijri: boolean;
    selectedSurah: string;
    selectedReciter: string;
    bg: string;
  };
  toggleAudio: (src: string) => void;
  restartAudio: (src: string) => void;
  list: {
    name_ar: string;
    name_en: string;
    query: string;
  }[];

  loadingStates: { [key: string]: boolean };
  setSelecedOption: Dispatch<
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

  function findIndexOfStringInObjectList(
    list: {
      name_ar: string;
      name_en: string;
      query: string;
    }[],
    stringToFind: string
  ): number {
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].name_ar === stringToFind ||
        list[i].name_en === stringToFind ||
        list[i].query === stringToFind
      ) {
        return i;
      }
    }
    return 0;
  }

  const surahIndex = findIndexOfStringInObjectList(
    list,
    selecedOption.selectedSurah
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const options = list.map(({ name_ar }, index) => `${index + 1}-  ${name_ar}`);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAudioSrc = `${selecedOption.selectedReciter}/${selecedOption.selectedSurah}.mp3`;
  const isCurrentlyLoading = loadingStates[currentAudioSrc];

  const handleOptionSelect = (index: number) => {
    const newSurah = list[index].query;
    const newAudioSrc = `${selecedOption.selectedReciter}/${newSurah}.mp3`;
    setSelecedOption((prevState) => ({
      ...prevState,
      selectedSurah: newSurah,
    }));

    toggleAudio(newAudioSrc);
    setIsOpen(false);
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
          {isCurrentlyLoading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
            </>
          ) : (
            list[surahIndex].name_ar || "Select A Surah"
          )}
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
                const newSurah = list[index].query;
                const audioSrc = `${selecedOption.selectedReciter}/${newSurah}.mp3`;
                const isOptionLoading = loadingStates[audioSrc];
                const isSelected = surahIndex === index;

                return (
                  <li
                    key={index}
                    className={`${ruqaa.className} ${
                      isSelected ? "bg-sky-500" : "hover:bg-zinc-800"
                    }   cursor-pointer text-sm flex items-center justify-between transition-colors duration-200`}
                  >
                    <button
                      className={`${
                        isSelected ? "bg-sky-500" : "hover:bg-zinc-800"
                      } px-2 py-2 w-full cursor-pointer text-sm flex items-center justify-between transition-colors duration-200`}
                      onClick={() =>
                        !isOptionLoading &&
                        handleOptionSelect(parseInt(option) - 1)
                      }
                    >
                      <span>{option}</span>
                      {isOptionLoading && (
                        <Loader2 className="animate-spin size-4" />
                      )}
                    </button>
                    <button
                      onClick={() => restartAudio(audioSrc)}
                      disabled={loadingStates[audioSrc]}
                      className={`${
                        isSelected ? "hover:bg-sky-300" : "hover:bg-zinc-700"
                      } ml-1 p-1.5 rounded-md transition-colors`}
                      aria-label={`Restart ${option}`}
                    >
                      <RotateCcw size={24} className="size-4" />
                    </button>
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
