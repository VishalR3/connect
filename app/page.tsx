export default function Home() {
  return (
    <>
      <div
        style={{
          gridArea: "primary-header/main",
        }}
      >
        Primary Header
      </div>
      <div
        style={{
          gridArea: "main/main",
        }}
      >
        Main Page
      </div>
    </>
  );
}
