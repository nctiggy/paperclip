import {
  claudeLocalReasoningEffortsForModel,
  DEFAULT_CLAUDE_LOCAL_MODEL,
} from "@paperclipai/adapter-claude-local";

const CLAUDE_REASONING_EFFORT_LABELS: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  xhigh: "X-High",
  max: "Max",
};

/**
 * Effort choices the selected Claude model actually accepts. Current Opus,
 * Sonnet 5 and Fable models add xhigh/max on top of low/medium/high, the 4.6
 * models add max only, and Haiku models expose no effort tier at all — so the
 * list is model-derived rather than a fixed low/medium/high triple.
 */
export function claudeReasoningEffortOptions(
  model: string | null | undefined,
  defaultLabel = "Default",
) {
  const resolvedModel = (typeof model === "string" ? model.trim() : "") || DEFAULT_CLAUDE_LOCAL_MODEL;
  return [
    { value: "", label: defaultLabel },
    ...claudeLocalReasoningEffortsForModel(resolvedModel).map((value) => ({
      value,
      label: CLAUDE_REASONING_EFFORT_LABELS[value] ?? value,
    })),
  ];
}
