import { scripts, ScriptId } from '../data/scripts';

interface Props {
  active: ScriptId;
  onChange: (id: ScriptId) => void;
}

export function ScriptTabs({ active, onChange }: Props) {
  return (
    <div className="script-tabs">
      {scripts.map((s) => (
        <button
          key={s.id}
          className={`script-tab ${active === s.id ? 'active' : ''}`}
          onClick={() => onChange(s.id)}
        >
          <span className="script-tab-tibetan" style={{ fontFamily: s.fontFamily }}>
            {s.tibetanName}
          </span>
          <span className="script-tab-name">{s.name}</span>
        </button>
      ))}
    </div>
  );
}
