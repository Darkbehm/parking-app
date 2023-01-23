import { ReactElement } from "react";

const buttonTypes = ["primary", "secondary", "normal"] as const;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string;
  type?: typeof buttonTypes[number];
}

const colors = {
  primary: {
    default: "from-sky-500 to-teal-300",
    active: "active:from-sky-600 active:to-teal-400",
  },
  secondary: {
    default: "from-stone-500 to-teal-300",
    active: "active:from-stone-600 active:to-teal-400",
  },
  normal: {
    default: "from-stone-500 to-slate-300",
    active: "active:from-stone-600 active:to-slate-400",
  },
};

export default ({ children, type, ...props }: Props): ReactElement => {
  return (
    <button
      className={`h-12 transition ease-in-out delay-15 hover:scale-125 duration-200 bg-gradient-to-r 
      ${colors[type ?? "normal"].default}
      text-neutral-50 font-medium px-4 py-2 rounded-md shadow-md
      ${colors[type ?? "normal"].active}`}
      {...props}
    >
      {children}
    </button>
  );
};
