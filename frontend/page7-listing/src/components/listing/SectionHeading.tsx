interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      <div className="mt-2 border-t border-gray-200" />
    </div>
  );
}