import clsx from "clsx";
import { Check, X } from "@phosphor-icons/react"
import * as RadixSwitch from "@radix-ui/react-switch";

const Switch = ({
  label,
  info,
  value,
  onChange,
  labelClass,
  disabled,
} = {}) => (
  <div className="flex items-center gap-2">
    <RadixSwitch.Root
      checked={value || false}
      onCheckedChange={onChange}
      className={clsx(
        "w-[40px] rounded-full border border-gray-300 h-[24px] p-[3px] group",
        value === false
          ? "bg-gray-200"
          : "bg-white"
      )}
    >
      <RadixSwitch.Thumb
        className={clsx(
          "rounded-full bg-gradient-to-br from-gray-500 to-gray-800 ring-1 ring-gray-800 h-full group-hover:scale-[0.9] aspect-square flex duration-[100ms] ease-in-out items-center justify-center",
          value === false ? "opacity-40" : "translate-x-[100%] bg-white"
        )}
      >
        {value === false ? (
          <X size={12} className="text-white" weight="bold" />
        ) : (
          <Check
            size={12}
            className="text-white"
            weight="bold"
          />
        )}
      </RadixSwitch.Thumb>
    </RadixSwitch.Root>
    <div className="ml-2">
      {label && (
        <h4
          className={clsx(
            "text-sm font-semibold",
            labelClass
          )}
        >
          {label}
        </h4>
      )}
      {info && (
        <p className="leading-tight font-normal text-gray-500">
          {info}
        </p>
      )}
    </div>
  </div>
);

export default Switch;
