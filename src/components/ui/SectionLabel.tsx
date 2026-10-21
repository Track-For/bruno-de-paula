export default function SectionLabel({
  number,
  children,
}: {
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="eyebrow">
      {number && <span>{number} /</span>}
      {children}
    </p>
  );
}
