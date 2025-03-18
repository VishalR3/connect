import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        style={{
          gridArea: "primary-header/main",
          alignItems: "center",
        }}
      >
        <div className="text-2xl">Apply Time Off</div>
      </div>
      <div
        style={{
          gridArea: "main/main",
        }}
      >
        {children}
      </div>
    </>
  );
}
