import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  ReactElement,
  SetStateAction,
} from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

export type InputModes = "default" | "danger" | "success";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  info?: string;
  mode?: InputModes;
  placeHolder?: string;
  hint?: string;
  type?: HTMLInputTypeAttribute;
  id: string;
  required?: boolean;
}

export default function Input({
  setValue,
  value,
  info,
  hint,
  label,
  placeHolder,
  type = "text",
  mode = "default",
  id,
  required = false,
}: Props): ReactElement {
  return (
    <div>
      <div className="flex justify-between">
        {label ? (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        ) : (
          ""
        )}
        {hint ? <span className="text-sm text-gray-500">{hint}</span> : ""}
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          required={required}
          id={id}
          value={value}
          className={
            "block w-full sm:text-sm rounded-md " +
            (mode === "default"
              ? "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              : mode === "danger"
              ? "pr-10 border-red-400 text-red-800 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              : "pr-10 border-green-400 text-green-800 placeholder-green-400 focus:outline-none focus:ring-green-500 focus:border-green-500")
          }
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeHolder}
          type={type}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {mode === "danger" ? (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          ) : mode === "success" ? (
            <CheckCircleIcon
              className="h-5 w-5 text-green-500"
              aria-hidden="true"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {info ? (
        <p
          className={
            "mt-2 text-sm " +
            (mode === "default"
              ? "text-gray-500"
              : mode === "danger"
              ? "text-red-600"
              : "text-green-600")
          }
        >
          {info}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
