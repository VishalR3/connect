import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grid items-center">
        <div className="grid">{children}</div>
      </div>
    </>
  );
}
