import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-slate-500">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center">
            {i > 0 && <span className="mx-2 text-slate-300">›</span>}
            {last || !it.to ? (
              <span className="font-medium text-slate-600">{it.label}</span>
            ) : (
              <Link to={it.to} className="hover:underline">{it.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
