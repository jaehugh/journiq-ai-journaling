import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/new");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 animate-fade-up">
        <div className="text-center">
          <img 
            src="/lovable-uploads/4467a08f-217f-4849-9986-2d10a9c97077.png" 
            alt="Journiq Logo" 
            className="h-16 mx-auto mb-4"
          />
          <p className="text-muted">Your AI-powered journaling companion</p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2C405E',
                    brandAccent: '#4A90E2',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;