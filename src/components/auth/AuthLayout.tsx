import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  containerClassName?: string;
}

const AuthLayout = ({ 
  children, 
  title, 
  description, 
  containerClassName = "max-w-[480px]"
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 pt-28 pb-20">
        <div className={`w-full animate-in fade-in slide-in-from-bottom-6 duration-700 ${containerClassName}`}>
          {(title || description) && (
            <div className="mb-10 text-center">
              {title && <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">{title}</h2>}
              {description && <p className="text-neutral-500 font-medium text-lg">{description}</p>}
            </div>
          )}
          
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
