import { HighlightResult } from "@/types";

function escape(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCodeSegment(segment: string): string {
  return escape(segment)
    .replace(
      /\b(SinOsc|Saw|Pulse|WhiteNoise|PinkNoise|BrownNoise|LFSaw|LFTri|LFPulse|LPF|HPF|BPF|Env|EnvGen|Pan2|Out|SynthDef|Synth|Mix|Done|FreeVerb|DelayN|Buffer|PlayBuf)\b/g,
      '<span class="hl-ugen">$1</span>',
    )
    .replace(
      /(?<=\.)(play|ar|kr|new|stop|free|read|scope|freeSelf|release|perc|linen|triangle|sine|boot|quit)\b/g,
      '<span class="hl-method">$1</span>',
    )
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="hl-number">$1</span>')
    .replace(/([{}()[\]])/g, '<span class="hl-brace">$1</span>')
    .replace(/(\\[a-zA-Z]\w*)/g, '<span class="hl-argument">$1</span>')
    .replace(/([a-zA-Z]\w*)(?=:)/g, '<span class="hl-argument">$1</span>')
    .replace(/\b(var)\b/g, '<span class="hl-keyword">$1</span>');
}

function highlightLine(
  line: string,
  startsInBlockComment: boolean,
): HighlightResult {
  let result = "";
  let i = 0;
  let inBlockComment = startsInBlockComment;

  while (i < line.length) {
    if (inBlockComment) {
      const blockCommentEnd = line.indexOf("*/", i);
      const commentEnd = blockCommentEnd === -1 ? line.length : blockCommentEnd + 2;
      result += `<span class="hl-comment">${escape(line.slice(i, commentEnd))}</span>`;

      if (blockCommentEnd === -1) {
        return { html: result, endsInBlockComment: true };
      }

      i = commentEnd;
      inBlockComment = false;
      continue;
    }

    const lineCommentStart = line.indexOf("//", i);
    const blockCommentStart = line.indexOf("/*", i);

    const hasLineComment = lineCommentStart !== -1;
    const hasBlockComment = blockCommentStart !== -1;

    if (!hasLineComment && !hasBlockComment) {
      result += highlightCodeSegment(line.slice(i));
      break;
    }

    if (
      hasLineComment &&
      (!hasBlockComment || lineCommentStart < blockCommentStart)
    ) {
      result += highlightCodeSegment(line.slice(i, lineCommentStart));
      result += `<span class="hl-comment">${escape(line.slice(lineCommentStart))}</span>`;
      break;
    }

    result += highlightCodeSegment(line.slice(i, blockCommentStart));

    const blockCommentEnd = line.indexOf("*/", blockCommentStart + 2);
    const commentEnd = blockCommentEnd === -1 ? line.length : blockCommentEnd + 2;

    result += `<span class="hl-comment">${escape(line.slice(blockCommentStart, commentEnd))}</span>`;

    if (blockCommentEnd === -1) {
      return { html: result, endsInBlockComment: true };
    }

    i = commentEnd;
  }

  return { html: result, endsInBlockComment: false };
}

export function highlight(code: string): string {
  let inBlockComment = false;

  return code
    .split("\n")
    .map((line) => {
      const highlighted = highlightLine(line, inBlockComment);
      inBlockComment = highlighted.endsInBlockComment;
      return highlighted.html;
    })
    .join("\n");
}
