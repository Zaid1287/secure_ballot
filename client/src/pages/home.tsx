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
                <p className="text-xl text-blue-50 max-w-2xl font-medium drop-shadow-md">
                  Experience next-gen Linkable Ring Signature(LRS)-based e-voting with complete privacy, fairness, and cryptographic linkability.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <Button 
                    onClick={login}
                    className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                    </svg>
                    Register with Microsoft
                  </Button>
                ) : (
                  <div className="text-xl">Welcome back, {user.name}!</div>
                )}
                
                {/* Microsoft Authentication Info */}
                {!user && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-semibold">Secured by Microsoft Azure AD</span>
                    </div>
                    <p className="text-blue-50 font-medium">
                      Enterprise-grade authentication with zero-knowledge architecture. 
                      Your credentials are never stored on our servers.
                    </p>
                  </div>
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
