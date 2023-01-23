import { ReactElement } from "react";

const buttonTypes = ["primary", "secondary", "normal"] as const;

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string;
  styleButton?: typeof buttonTypes[number];
  extraClassName?: string;
}

const colors = {
  primary: {
    default: "from-sky-500 to-teal-300",
    active: "active:from-sky-600 active:to-teal-400",
  },
  secondary: {
    default: "from-stone-500 to-sky-300",
    active: "active:from-stone-600 active:to-sky-400",
  },
  normal: {
    default: "from-stone-500 to-slate-300",
    active: "active:from-stone-600 active:to-slate-400",
  },
};

export default ({
  children,
  styleButton,
  extraClassName,
  ...props
}: PropsButton): ReactElement<PropsButton> => {
  const className = `min-h-12 transition ease-in-out delay-15 hover:scale-125 duration-200 bg-gradient-to-r
  ${colors[styleButton ?? "normal"].default}
  text-neutral-50 font-medium px-4 py-2 rounded-md shadow-md
  ${colors[styleButton ?? "normal"].active} ${extraClassName ?? ""}`;

  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
