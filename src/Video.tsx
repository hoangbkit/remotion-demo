import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const subtitleIn = spring({
    frame: frame - 48,
    fps,
    config: { damping: 16 },
  });
  const buttonIn = spring({
    frame: frame - 105,
    fps,
    config: { damping: 10, stiffness: 130 },
  });

  const orbScale = 1 + Math.sin(frame / 18) * 0.12;
  const orbRotation = interpolate(frame, [0, 300], [0, 180]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080B18",
        color: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 850,
          height: 850,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)",
          left: -220,
          top: -330,
          transform: `scale(${orbScale}) rotate(${orbRotation}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.42) 0%, rgba(14,165,233,0) 70%)",
          right: -180,
          bottom: -330,
          transform: `scale(${1.1 - (orbScale - 1)})`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: 50,
        }}
      >
        <div
          style={{
            color: "#C4B5FD",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 7,
            marginBottom: 30,
            opacity: titleIn,
          }}
        >
          INTRODUCING SOMETHING NEW
        </div>

        <div
          style={{
            fontSize: 112,
            lineHeight: 1.05,
            fontWeight: 900,
            letterSpacing: -6,
            opacity: titleIn,
            transform: `translateY(${interpolate(titleIn, [0, 1], [70, 0])}px)`,
          }}
        >
          Create
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #A78BFA, #38BDF8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Without Limits.
          </span>
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 27,
            color: "#A1A1AA",
            opacity: subtitleIn,
            transform: `translateY(${interpolate(subtitleIn, [0, 1], [24, 0])}px)`,
          }}
        >
          Turn your ideas into something extraordinary.
        </div>

        <div
          style={{
            display: "inline-block",
            marginTop: 54,
            padding: "19px 48px",
            borderRadius: 999,
            background: "linear-gradient(90deg, #7C3AED, #2563EB)",
            boxShadow: "0 12px 55px rgba(99,102,241,0.35)",
            fontSize: 21,
            fontWeight: 800,
            letterSpacing: 1,
            opacity: buttonIn,
            transform: `scale(${buttonIn})`,
          }}
        >
          GET STARTED&nbsp; →
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 46,
          zIndex: 1,
          color: "#71717A",
          fontSize: 15,
          letterSpacing: 5,
        }}
      >
        MADE WITH REMOTION
      </div>
    </AbsoluteFill>
  );
};
