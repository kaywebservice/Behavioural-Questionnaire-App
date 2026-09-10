import React, { useState } from "react";

// Each option awards a point to one side of a trait dimension.
const QUESTIONS = [
  {
    id: 1,
    text: "Do you prefer working alone or in a team?",
    options: [
      { label: "Working alone", trait: "solo" },
      { label: "Working in a team", trait: "team" },
    ],
  },
  {
    id: 2,
    text: "Are you more creative or analytical?",
    options: [
      { label: "Creative", trait: "creative" },
      { label: "Analytical", trait: "analytical" },
    ],
  },
  {
    id: 3,
    text: "How do you usually make decisions?",
    options: [
      { label: "Trust my gut", trait: "creative" },
      { label: "Weigh the data", trait: "analytical" },
    ],
  },
  {
    id: 4,
    text: "Pick the weekend that recharges you most.",
    options: [
      { label: "Deep-focus solo project", trait: "solo" },
      { label: "Hackathon with friends", trait: "team" },
    ],
  },
  {
    id: 5,
    text: "When learning something new, you…",
    options: [
      { label: "Experiment and tinker", trait: "creative" },
      { label: "Follow a structured course", trait: "analytical" },
    ],
  },
  {
    id: 6,
    text: "Your ideal role on a project is…",
    options: [
      { label: "Owning it end-to-end", trait: "solo" },
      { label: "Collaborating across roles", trait: "team" },
    ],
  },
];

const PROFILES = {
  "solo-creative": {
    name: "The Independent Creator",
    emoji: "🎨",
    blurb:
      "You do your best work with headphones on and a blank canvas. Original ideas, self-direction, and craft are your superpowers.",
    strengths: ["Original thinking", "Self-motivation", "Deep focus"],
  },
  "solo-analytical": {
    name: "The Solo Strategist",
    emoji: "♟️",
    blurb:
      "Quiet, precise, relentless. You break hard problems into clean systems and ship solutions others missed.",
    strengths: ["Systems thinking", "Precision", "Reliability"],
  },
  "team-creative": {
    name: "The Collaborative Spark",
    emoji: "⚡",
    blurb:
      "You light rooms up. Brainstorms, workshops, whiteboards — your energy turns groups into creative engines.",
    strengths: ["Ideation", "Communication", "Energy"],
  },
  "team-analytical": {
    name: "The Analytical Anchor",
    emoji: "🧭",
    blurb:
      "Teams trust you with the numbers and the plan. You turn chaos into roadmaps and keep everyone pointed true north.",
    strengths: ["Data-driven decisions", "Planning", "Mentorship"],
  },
};

function buildProfile(answers) {
  const tally = { solo: 0, team: 0, creative: 0, analytical: 0 };
  Object.values(answers).forEach((trait) => {
    if (tally[trait] !== undefined) tally[trait] += 1;
  });
  const style = tally.solo >= tally.team ? "solo" : "team";
  const mind = tally.creative >= tally.analytical ? "creative" : "analytical";
  return PROFILES[`${style}-${mind}`];
}

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const question = QUESTIONS[step];
  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  const choose = (trait) => {
    const next = { ...answers, [question.id]: trait };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  if (done) {
    const profile = buildProfile(answers);
    return (
      <div className="page">
        <div className="card result">
          <p className="eyebrow">Your behavioural profile</p>
          <div className="result-emoji">{profile.emoji}</div>
          <h1>{profile.name}</h1>
          <p className="muted">{profile.blurb}</p>
          <div className="strengths">
            {profile.strengths.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <button className="btn btn-ghost" onClick={restart}>
            Retake questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <p className="eyebrow">Behavioural Questionnaire</p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="step-count">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <h1 className="question">{question.text}</h1>
        <div className="options">
          {question.options.map((opt) => (
            <button
              key={opt.label}
              className={
                "option" + (answers[question.id] === opt.trait ? " selected" : "")
              }
              onClick={() => choose(opt.trait)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="nav-row">
          <button className="btn btn-ghost" onClick={back} disabled={step === 0}>
            ← Back
          </button>
          <p className="muted small">
            {Object.keys(answers).length} of {QUESTIONS.length} answered
          </p>
        </div>
      </div>
    </div>
  );
}
