import { describe, it, expect } from "vitest";
import { validateSCCode, isPlayableSCCode, parseSCCode } from "../scCodeParser";

// ---------------------------------------------------------------------------
// validateSCCode
// ---------------------------------------------------------------------------

describe("validateSCCode", () => {
  describe("valid code", () => {
    it("accepts a minimal valid sine oscillator", () => {
      const result = validateSCCode("{ SinOsc.ar(440).play }");
      expect(result.ok).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("accepts code where UPPERCASE only appears inside a comment", () => {
      const result = validateSCCode(
        "// Replace FREQ with a number\n{ SinOsc.ar(440).play }",
      );
      expect(result.ok).toBe(true);
    });
  });

  describe("unbalanced delimiters", () => {
    it("reports missing closing brace", () => {
      const result = validateSCCode("{ SinOsc.ar(440).play");
      expect(result.ok).toBe(false);
      expect(result.errors.some((e) => e.en.length > 0)).toBe(true);
    });

    it("reports extra closing brace", () => {
      const result = validateSCCode("{ SinOsc.ar(440).play }}");
      expect(result.ok).toBe(false);
    });

    it("reports unbalanced parentheses", () => {
      const result = validateSCCode("{ SinOsc.ar(440.play }");
      expect(result.ok).toBe(false);
    });

    it("reports unbalanced brackets", () => {
      const result = validateSCCode("{ SinOsc.ar([440).play }");
      expect(result.ok).toBe(false);
    });
  });

  describe("missing .play", () => {
    it("reports error when .play is absent", () => {
      const result = validateSCCode("{ SinOsc.ar(440) }");
      expect(result.ok).toBe(false);
    });

    it("does not false-positive on 'player' (word boundary check)", () => {
      // 'player' contains 'play' without word boundary — should still fail
      const result = validateSCCode("{ SinOsc.ar(440) } // player");
      expect(result.ok).toBe(false);
    });
  });

  describe("missing UGen", () => {
    it("reports error when no recognised UGen is present", () => {
      const result = validateSCCode("{ 440.play }");
      expect(result.ok).toBe(false);
    });
  });

  describe("UPPERCASE placeholders", () => {
    it("reports error for UPPERCASE word in code body", () => {
      const result = validateSCCode("{ SinOsc.ar(FREQ).play }");
      expect(result.ok).toBe(false);
    });

    it("ignores short two-letter words (not placeholders)", () => {
      // 'AR' is only 2 chars — below the 3-char threshold
      const result = validateSCCode("{ SinOsc.ar(440).play } // AR");
      expect(result.ok).toBe(true);
    });
  });

  describe("multiple errors at once", () => {
    it("collects all errors in a single pass", () => {
      // Missing .play AND UPPERCASE placeholder AND unbalanced brace
      const result = validateSCCode("{ SinOsc.ar(FREQ) }");
      expect(result.ok).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    });
  });
});

// ---------------------------------------------------------------------------
// isPlayableSCCode
// ---------------------------------------------------------------------------

describe("isPlayableSCCode", () => {
  it("returns true for valid code", () => {
    expect(isPlayableSCCode("{ SinOsc.ar(440).play }")).toBe(true);
  });

  it("returns false for invalid code", () => {
    expect(isPlayableSCCode("{ SinOsc.ar(440) }")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// parseSCCode
// ---------------------------------------------------------------------------

describe("parseSCCode", () => {
  describe("stereo flag", () => {
    it("sets stereo: false when ! 2 is absent", () => {
      const config = parseSCCode("{ SinOsc.ar(440).play }");
      expect(config.stereo).toBe(false);
    });

    it("sets stereo: true when ! 2 is present", () => {
      const config = parseSCCode("{ SinOsc.ar(440) ! 2 }.play");
      expect(config.stereo).toBe(true);
    });
  });

  describe("plain oscillators", () => {
    it("parses a simple sine at 440 Hz", () => {
      const config = parseSCCode("{ SinOsc.ar(440).play }");
      expect(config.type).toBe("sine");
      expect(config.freq).toBe(440);
    });

    it("parses amplitude from the third argument", () => {
      const config = parseSCCode("{ SinOsc.ar(440, 0, 0.5).play }");
      expect(config.amp).toBe(0.5);
    });

    it("parses a sawtooth oscillator", () => {
      const config = parseSCCode("{ Saw.ar(220).play }");
      expect(config.type).toBe("sawtooth");
      expect(config.freq).toBe(220);
    });

    it("parses amplitude from Saw's second argument", () => {
      const config = parseSCCode("{ Saw.ar(220, 0.3).play }");
      expect(config.amp).toBe(0.3);
    });

    it("parses a pulse/square oscillator", () => {
      const config = parseSCCode("{ Pulse.ar(440).play }");
      expect(config.type).toBe("square");
    });

    it("parses pulse width from Pulse's second argument", () => {
      const config = parseSCCode("{ Pulse.ar(440, 0.25).play }");
      expect(config.pulseWidth).toBe(0.25);
    });

    it("parses a triangle oscillator (LFTri)", () => {
      const config = parseSCCode("{ LFTri.ar(330).play }");
      expect(config.type).toBe("triangle");
      expect(config.freq).toBe(330);
    });
  });

  describe("noise", () => {
    it("parses white noise", () => {
      const config = parseSCCode("{ WhiteNoise.ar(0.5).play }");
      expect(config.type).toBe("noise");
      expect(config.color).toBe("white");
      expect(config.amp).toBe(0.5);
    });

    it("parses pink noise", () => {
      const config = parseSCCode("{ PinkNoise.ar(0.3).play }");
      expect(config.color).toBe("pink");
    });

    it("parses brown noise", () => {
      const config = parseSCCode("{ BrownNoise.ar(0.2).play }");
      expect(config.color).toBe("brown");
    });
  });

  describe("mix (multiple oscillators)", () => {
    it("detects a mix when two UGens are present", () => {
      const config = parseSCCode(
        "{ (SinOsc.ar(440) + Saw.ar(220)) * 0.5 }.play",
      );
      expect(config.type).toBe("mix");
      expect(config.oscillators).toHaveLength(2);
    });

    it("extracts frequencies for each oscillator in the mix", () => {
      const config = parseSCCode(
        "{ (SinOsc.ar(440) + SinOsc.ar(880)) * 0.3 }.play",
      );
      const freqs = config.oscillators?.map((o) => o.freq);
      expect(freqs).toContain(440);
      expect(freqs).toContain(880);
    });
  });

  describe("frequency sweep", () => {
    it("parses exponential sweep via XLine", () => {
      const config = parseSCCode(
        "{ SinOsc.ar(XLine.ar(200, 2000, 3)).play }",
      );
      expect(config.sweep?.start).toBe(200);
      expect(config.sweep?.end).toBe(2000);
      expect(config.sweep?.duration).toBe(3);
      expect(config.sweep?.curve).toBe("exponential");
    });

    it("parses linear sweep via Line", () => {
      const config = parseSCCode(
        "{ SinOsc.ar(Line.ar(100, 1000, 2)).play }",
      );
      expect(config.sweep?.curve).toBe("linear");
      expect(config.sweep?.start).toBe(100);
    });
  });

  describe("FM synthesis", () => {
    it("detects frequency modulation with LFSaw", () => {
      const config = parseSCCode(
        "{ SinOsc.ar(LFSaw.ar(5) * 200 + 440).play }",
      );
      expect(config.lfo?.target).toBe("frequency");
      expect(config.lfo?.rate).toBe(5);
      expect(config.lfo?.shape).toBe("sawtooth");
    });
  });

  describe("AM synthesis", () => {
    it("detects amplitude modulation", () => {
      const config = parseSCCode(
        "{ SinOsc.ar(440) * LFSaw.ar(3) * 0.5 }.play",
      );
      expect(config.lfo?.target).toBe("amplitude");
      expect(config.lfo?.rate).toBe(3);
    });
  });

  describe("envelope", () => {
    it("parses Env.perc attack and decay", () => {
      const config = parseSCCode(
        "{ SinOsc.ar(440) * EnvGen.ar(Env.perc(0.01, 1.5)) }.play",
      );
      expect(config.env?.attack).toBe(0.01);
      expect(config.env?.decay).toBe(1.5);
    });
  });

  describe("panning", () => {
    it("sets pan: true when Pan2 is present", () => {
      const config = parseSCCode(
        "{ Pan2.ar(SinOsc.ar(440), SinOsc.kr(0.5)) }.play",
      );
      expect(config.pan).toBe(true);
    });
  });

  describe("unknown code", () => {
    it("returns an empty config for unrecognised code", () => {
      const config = parseSCCode("something unknown");
      expect(config).toBeDefined();
      expect(config.stereo).toBe(false);
    });
  });
});
