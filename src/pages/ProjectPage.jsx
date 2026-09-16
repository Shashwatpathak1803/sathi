import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProject, projects } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import ProjectDetails from '../components/ProjectDetails';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.name} | ${siteConfig.name}`;
    return () => {
      document.title = `${siteConfig.name} | ${siteConfig.fullName}`;
    };
  }, [project]);

  if (!project) return <Navigate to="/404" replace />;

  const others = projects.filter((p) => p.slug !== slug);
  return <ProjectDetails project={project} otherProjects={others} />;
}
