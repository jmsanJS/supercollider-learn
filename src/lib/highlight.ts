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
          /\b(SinOsc|Saw|Pulse|WhiteNoise|PinkNoise|LFSaw|LPF|HPF|Env|EnvGen|Pan2|Out|SynthDef|Synth|Mix)\b/g,
          '<span class="hl-ugen">$1</span>',
        )
        .replace(
          /\b(play|ar|kr|new|stop|free|release|perc|linen)\b/g,
          '<span class="hl-method">$1</span>',
        )
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="hl-number">$1</span>')
        .replace(/([{}()[\]])/g, '<span class="hl-brace">$1</span>'),
    )
    .join("\n");
}
