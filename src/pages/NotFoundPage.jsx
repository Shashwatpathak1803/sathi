import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section page-top">
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
