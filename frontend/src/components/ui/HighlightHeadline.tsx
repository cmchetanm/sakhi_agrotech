interface HighlightHeadlineProps {
  before: string;
  highlight: string;
  after: string;
  highlightClassName?: string;
}

/** Renders a split headline with a guaranteed space before the highlighted span. */
export default function HighlightHeadline({
  before,
  highlight,
  after,
  highlightClassName = "not-italic text-leaf",
}: HighlightHeadlineProps) {
  const beforeText = before.trimEnd();
  const highlightText = highlight.trim();
  const afterText = after.trim();
  const afterPrefix =
    afterText && /^[.,;:!?]/.test(afterText) ? "" : afterText ? " " : "";

  return (
    <>
      {beforeText}
      {" "}
      <em className={highlightClassName}>{highlightText}</em>
      {afterText ? `${afterPrefix}${afterText}` : null}
    </>
  );
}
