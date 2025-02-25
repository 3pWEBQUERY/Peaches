interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthCard({ children, title }: AuthCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h1>
      {children}
    </div>
  );
}
