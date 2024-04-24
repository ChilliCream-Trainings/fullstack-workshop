import "./title.css";

interface IntroProps {
  title: string;
  subtitle: string;
}

export function Title({ title, subtitle }: IntroProps) {
  return (
    <div className="eshop-header-title">
      <div className="eshop-header-title-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
