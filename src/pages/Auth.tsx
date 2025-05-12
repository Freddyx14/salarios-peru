
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const { authState, login, signup, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // If user is already logged in, redirect to home page
  if (authState.user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAuthError(null);
      await login(email, password);
    } catch (error) {
      setAuthError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAuthError(null);
      await signup(email, password);
    } catch (error) {
      setAuthError("Error al registrarse. Intenta con otro correo electrónico.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <img 
            src="/lovable-uploads/594e2d90-4bd5-4959-92c8-3bf7651bd3da.png" 
            alt="Salarios Perú Logo" 
            className="h-16 mx-auto mb-2"
          />
          <CardTitle className="text-2xl font-bold text-blue-800 font-serif">
            Accede a Salarios Perú
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-blue-800 font-medium">
                    Correo Electrónico
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-blue-800 font-medium">
                    Contraseña
                  </label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                {authError && (
                  <p className="text-red-500 text-sm">{authError}</p>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-blue-800 font-medium">
                    Correo Electrónico
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-blue-800 font-medium">
                    Contraseña
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                    minLength={6}
                  />
                  <p className="text-xs text-blue-500">La contraseña debe tener al menos 6 caracteres.</p>
                </div>
                
                {authError && (
                  <p className="text-red-500 text-sm">{authError}</p>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
