import clsx from "clsx";

const ContentWrapper = ({ children, className, width }) => (
  <div
    style={{ maxWidth: `${width || "100%"}` }}
    className={clsx("w-full mx-auto relative", className)}
  >
    {children}
  </div>
);

export default ContentWrapper;
