import React from 'react';

export const ExperienceQuote: React.FC = () => {
  return (
    <aside className="editorial-right-quote-column" aria-label="Brand Philosophy">
      {/* Top vertical decorative line */}
      <div className="quote-vertical-rule" />

      {/* Uppercase Header */}
      <div className="quote-eyebrow">
        <span>CRAFTED</span>
        <span>FOR A</span>
        <span>BETTER YOU</span>
      </div>

      {/* Decorative Large Quotation Mark */}
      <div className="quote-mark" aria-hidden="true">
        “
      </div>

      {/* Serif Italic Quote */}
      <blockquote className="quote-text">
        It's not just<br />
        a haircut, it's<br />
        how you feel<br />
        next.
      </blockquote>

      {/* Bottom subtle underline */}
      <div className="quote-bottom-line" />
    </aside>
  );
};
