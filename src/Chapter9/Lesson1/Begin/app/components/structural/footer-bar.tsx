import "./footer-bar.css";

export default function FooterBar() {
  return (
    <footer className="eshop-footer">
      <div className="eshop-footer-content">
        <div className="eshop-footer-row">
          <img
            role="presentation"
            src="/images/logo-footer.svg"
            className="logo logo-footer"
          />
          <p>© Northern Mountains</p>
        </div>
      </div>
    </footer>
  );
}
