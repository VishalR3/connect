import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grid items-center px-4 pb-4">
        <div className="text-2xl">Apply Time Off</div>
        <div className="grid">{children}</div>
      </div>
    </>
  );
}
