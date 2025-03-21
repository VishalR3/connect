import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grid items-center pb-4">
        <div className="grid">{children}</div>
      </div>
    </>
  );
}
