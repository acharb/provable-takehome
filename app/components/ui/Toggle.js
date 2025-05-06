"use client";

import { Switch } from "@headlessui/react";

export default function Toggle({ enabled, onChange, leftLabel, rightLabel }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-400">{leftLabel}</span>
      <Switch
        checked={enabled}
        onChange={onChange}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 data-[checked]:bg-indigo-600"
      >
        <span className="sr-only">
          Toggle between {leftLabel} and {rightLabel}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 transform rounded-full bg-gray-200 shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <span className="text-sm text-gray-400">{rightLabel}</span>
    </div>
  );
}
