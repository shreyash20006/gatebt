import { getCategories, getSubjects, getResources } from '@/lib/data';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60; // Revalidate static data every 60 seconds

export default async function HomePage() {
  const [categories, subjects, resources] = await Promise.all([
    getCategories(),
    getSubjects(),
    getResources(),
  ]);

  return <HomeClient categories={categories} subjects={subjects} resources={resources} />;
}
