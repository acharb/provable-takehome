"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";

export default function Select({ value, onChange, options }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="h-full relative">
        <ListboxButton className="cursor-pointer text-xs sm:text-sm text-gray-300 flex items-center justify-between w-full h-full rounded-lg bg-gray-800 py-1.5 pl-3 pr-2 text-left outline outline-1 -outline-offset-1 outline-gray-700 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500">
          <span className="">{value.name}</span>
          <ChevronsUpDown aria-hidden="true" className="size-5 text-gray-400" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="cursor-pointer group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-300 data-[focus]:bg-indigo-800 data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {option.name}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <Check aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
