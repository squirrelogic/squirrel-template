export default async function Page(): Promise<React.ReactElement> {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="h-full w-full rounded-xl bg-muted/50 mt-4" />
    </>
  );
}
