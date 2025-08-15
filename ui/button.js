import classnames from "classnames";
import clsx from "clsx";
import Link from "next/link";

export default function Button(props) {
  const {
    className,
    prefix,
    disabled,
    suffix,
    children,
    variant,
    onClick,
    as,
    href,
    active,
    target,
  } = props;

  const makeButtonClass = ({ active } = {}) => {
    switch (variant) {
      case "side":
        return `px-[5px] text-[0.7rem] bg-gray-50 rounded-md text-gray-600/80 font-normal border border-gray-300 font-code leading-normal flex items-center justify-center duration-100 cursor-default`;
      case "primary":
        return `w-full px-4 py-2 md:py-[8px] text-white rounded-lg bg-gradient-to-br from-red-400 to-pink-600 hover:scale-[0.98] active:scale-[0.95] border border-transparent shadow-lg flex items-center justify-center duration-100 cursor-pointer`;
      case "secondary":
        return `relative flex items-center justify-center px-2 py-[3px] rounded-lg cursor-pointer group text-sm text-gray-900 shadow-sm border border-gray-300 min-h-[28px] hover:scale-[0.98] bg-white duration-100`;
      case "ternary":
        return clsx(
          "py-[2.4px] px-3 flex items-center relative rounded-[7px] cursor-pointer",
          active
            ? "text-black border-gray-300 bg-gray-200/80"
            : "text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-200/50"
        );
      default:
        return ``;
    }
  };

  if (as === "a") {
    return (
      <Link
        href={href}
        target={target ?? ""}
        className={classnames(makeButtonClass({ active }), {
          [className]: className,
        })}
      >
        {prefix && prefix}
        {children}
        {suffix && suffix}
      </Link>
    );
  }

  if (as === "div") {
    return (
      <div
        {...props}
        onClick={onClick}
        className={classnames(
          makeButtonClass({ active }),
          {
            [className]: className,
          },
          { "opacity-60 cursor-not-allowed": disabled }
        )}
      >
        {prefix && prefix}
        {children}
        {suffix && suffix}
      </div>
    );
  }

  return (
    <button
      {...props}
      active="false"
      onClick={onClick}
      className={classnames(
        makeButtonClass({ active }),
        {
          [className]: className,
        },
        { "opacity-60 cursor-not-allowed": disabled }
      )}
    >
      {prefix && prefix}
      {children}
      {suffix && suffix}
    </button>
  );
}
