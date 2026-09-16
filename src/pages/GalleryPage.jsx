import { useEffect } from 'react';
import Gallery from '../components/Gallery';
import SectionHeading from '../components/SectionHeading';
import { siteConfig } from '../data/siteConfig';

export default function GalleryPage() {
  useEffect(() => {
    document.title = `Gallery | ${siteConfig.name}`;
    return () => {
      document.title = `${siteConfig.name} | ${siteConfig.fullName}`;
    };
  }, []);

  return (
    <section className="section page-top" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          eyebrow="Gallery"
          id="gallery-title"
          title="Photographs from the Field"
          align="center"
        />
        <Gallery />
      </div>
    </section>
  );
}
