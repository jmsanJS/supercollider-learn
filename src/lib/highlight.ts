function escape(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlight(code: string): string {
  return code
    .split("\n")
    .map((line) =>
      escape(line)
        .replace(/(\/\/.*)/g, '<span class="hl-comment">$1</span>')
        .replace(
          /\b(SinOsc|Saw|Pulse|WhiteNoise|PinkNoise|BrownNoise|LFSaw|LFTri|LFPulse|LPF|HPF|BPF|Env|EnvGen|Pan2|Out|SynthDef|Synth|Mix|Done|FreeVerb|DelayN)\b/g,
          '<span class="hl-ugen">$1</span>',
        )
        .replace(
          /(?<=\.)(play|ar|kr|new|stop|free|scope|freeSelf|release|perc|linen|triangle|sine|boot|quit)\b/g,
          '<span class="hl-method">$1</span>',
        )
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="hl-number">$1</span>')
        .replace(/([{}()[\]])/g, '<span class="hl-brace">$1</span>')
        .replace(/(\\[a-zA-Z]\w*)/g, '<span class="hl-argument">$1</span>')
        .replace(/([a-zA-Z]\w*)(?=:)/g, '<span class="hl-argument">$1</span>')
        .replace(/\b(var)\b/g, '<span class="hl-keyword">$1</span>'),
    )
    .join("\n");
}
