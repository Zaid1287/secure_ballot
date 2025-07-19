import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Shield, ShieldQuestion, Lock, TrendingUp, Key, Settings, ExpandIcon } from "lucide-react";

export default function Home() {
  const { user, login } = useAuth();

  const features = [
    {
      icon: ShieldQuestion,
      title: "Anonymous Voting",
      description: "Votes are signed using Linkable Ring Signatures (LRS) ensuring identity privacy and unlinkability.",
      color: "bg-blue-50 dark:bg-gray-800",
      iconColor: "bg-primary-600",
    },
    {
      icon: Lock,
      title: "End-to-End Security", 
      description: "With Helmet, express-validator, and rate-limiting, the system is hardened against abuse and injection.",
      color: "bg-teal-50 dark:bg-gray-800",
      iconColor: "bg-teal-600",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Results",
      description: "Admins can view election results instantly with dynamic visualizations and tie-breaker logic.",
      color: "bg-green-50 dark:bg-gray-800",
      iconColor: "bg-green-600",
    },
    {
      icon: Key,
      title: "Decentralized Key Storage",
      description: "No keys are stored on server. Voters control their private keys locally on their browser.",
      color: "bg-purple-50 dark:bg-gray-800",
      iconColor: "bg-purple-600",
    },
    {
      icon: Settings,
      title: "Admin Control",
      description: "Admin dashboard to open/close registration & voting and fetch live results with full control.",
      color: "bg-orange-50 dark:bg-gray-800",
      iconColor: "bg-orange-600",
    },
    {
      icon: ExpandIcon,
      title: "Scalable Ring Voting",
      description: "Randomized ring size prevents server overload, enabling fast vote generation even for 1000s of users.",
      color: "bg-pink-50 dark:bg-gray-800",
      iconColor: "bg-pink-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-teal-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000" 
            alt="Abstract cryptocurrency blockchain network" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block">Secure.</span>
                  <span className="block">Anonymous.</span>
                  <span className="block text-teal-300">Decentralized.</span>
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl">
                  Experience next-gen Linkable Ring Signature(LRS)-based e-voting with complete privacy, fairness, and cryptographic linkability.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <Button 
                    onClick={login}
                    className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Register with Google
                  </Button>
                ) : (
                  <div className="text-xl">Welcome back, {user.name}!</div>
                )}
                <Button 
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Secure digital voting interface with encryption" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What's in this Voting System?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge cryptographic technology to ensure the highest levels of security and privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2`}>
                <div className={`w-16 h-16 ${feature.iconColor} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cryptographic Confidence Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                End-to-End Cryptographic Confidence
              </h2>
              <p className="text-xl text-blue-100">
                Our voting protocol is built with complete transparency, allowing voters to verify their vote inclusion while remaining anonymous.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-teal-300">256-bit</div>
                  <div className="text-sm text-blue-100">Encryption</div>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-teal-300">Zero</div>
                  <div className="text-sm text-blue-100">Server Keys</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Advanced cryptographic security with digital encryption patterns" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
