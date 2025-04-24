
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBackendConfig, setBackendType, checkSupabaseAvailability } from '@/utils/backendConfig';

const Settings: React.FC = () => {
  const [backendType, setBackendTypeState] = useState<'supabase' | 'mongodb'>('supabase');
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState<boolean>(true);
  const { toast } = useToast();

  // Load current backend type and check Supabase availability
  useEffect(() => {
    const config = getBackendConfig();
    setBackendTypeState(config.type);
    
    const checkAvailability = async () => {
      const available = await checkSupabaseAvailability();
      setIsSupabaseAvailable(available);
    };
    
    checkAvailability();
  }, []);

  const handleSwitchBackend = (type: 'supabase' | 'mongodb') => {
    if (type === 'supabase' && !isSupabaseAvailable) {
      toast({
        title: "Error",
        description: "Supabase is currently not available. Using MongoDB instead.",
        variant: "destructive",
      });
      return;
    }
    
    setBackendType(type);
    setBackendTypeState(type);
    
    toast({
      title: "Backend Changed",
      description: `Now using ${type === 'supabase' ? 'Supabase' : 'MongoDB'} as backend`,
    });
  };

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-blog-heading mb-6">Settings</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Backend Configuration</CardTitle>
            <CardDescription>
              Choose which backend service to use for data storage and authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">Supabase</h3>
                  <p className="text-sm text-gray-500">
                    Primary backend with real-time features
                    {!isSupabaseAvailable && (
                      <span className="ml-2 text-red-500 font-medium">(Currently unavailable)</span>
                    )}
                  </p>
                </div>
                
                <Button 
                  onClick={() => handleSwitchBackend('supabase')}
                  disabled={!isSupabaseAvailable}
                  variant={backendType === 'supabase' ? 'default' : 'outline'}
                >
                  {backendType === 'supabase' ? 'Active' : 'Use Supabase'}
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">MongoDB (Local)</h3>
                  <p className="text-sm text-gray-500">
                    Fallback local backend for when Supabase is unavailable
                  </p>
                </div>
                
                <Button 
                  onClick={() => handleSwitchBackend('mongodb')}
                  variant={backendType === 'mongodb' ? 'default' : 'outline'}
                >
                  {backendType === 'mongodb' ? 'Active' : 'Use MongoDB'}
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Note:</strong> Changing backends will log you out and may result in seeing different data.
                  The system will automatically switch to MongoDB if Supabase becomes unavailable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
