import '../globals.css'

export default function PrincipalLayout({ params, children }: PageProps) {
  return (
    <div>
      {children}
    </div>
  );
}

interface PageProps {
  params: {
    locale: string;
  };
  children: React.ReactNode;
}
