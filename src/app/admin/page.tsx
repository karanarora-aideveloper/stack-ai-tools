import { Metadata } from 'next';
import { getAllAdminTools, getAllPrompts } from '@/lib/tools';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Admin Management Console | Stack AI Tools',
  description: 'Manage tools directory, affiliate tracking links, and community submissions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const [{ approved, pending }, prompts] = await Promise.all([
    getAllAdminTools(),
    getAllPrompts()
  ]);

  return (
    <AdminDashboard 
      initialApprovedTools={approved}
      initialPendingTools={pending}
      initialPrompts={prompts}
    />
  );
}
