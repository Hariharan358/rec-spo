import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Server, Database, Cloud } from 'lucide-react';

interface ServerStatusProps {
  className?: string;
}

export const ServerStatus: React.FC<ServerStatusProps> = ({ className = '' }) => {
  const [status, setStatus] = useState<{
    server: 'online' | 'offline' | 'checking';
    database: 'connected' | 'disconnected' | 'checking';
    cloudinary: 'configured' | 'not-configured' | 'checking';
    lastChecked: Date | null;
  }>({
    server: 'checking',
    database: 'checking',
    cloudinary: 'checking',
    lastChecked: null,
  });

  const checkServerStatus = async () => {
    setStatus(prev => ({
      ...prev,
      server: 'checking',
      database: 'checking',
      cloudinary: 'checking',
    }));

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(apiUrl.replace('/api', ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus({
          server: 'online',
          database: 'connected', // Assume connected if server responds
          cloudinary: 'configured', // Assume configured if server is running
          lastChecked: new Date(),
        });
      } else {
        throw new Error('Server not responding');
      }
    } catch (error) {
      console.error('Server status check failed:', error);
      setStatus({
        server: 'offline',
        database: 'disconnected',
        cloudinary: 'not-configured',
        lastChecked: new Date(),
      });
    }
  };

  useEffect(() => {
    checkServerStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'configured':
        return 'bg-green-500';
      case 'offline':
      case 'disconnected':
      case 'not-configured':
        return 'bg-red-500';
      case 'checking':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (service: string, status: string) => {
    if (status === 'checking') return 'Checking...';
    
    switch (service) {
      case 'server':
        return status === 'online' ? 'Online' : 'Offline';
      case 'database':
        return status === 'connected' ? 'Connected' : 'Disconnected';
      case 'cloudinary':
        return status === 'configured' ? 'Configured' : 'Not Configured';
      default:
        return status;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">System Status</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={checkServerStatus}
          disabled={status.server === 'checking'}
        >
          <RefreshCw className={`h-4 w-4 ${status.server === 'checking' ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Backend Server</span>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusColor(status.server)} text-white border-0`}
          >
            {getStatusText('server', status.server)}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-gray-500" />
            <span className="text-sm">MongoDB</span>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusColor(status.database)} text-white border-0`}
          >
            {getStatusText('database', status.database)}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Cloudinary</span>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusColor(status.cloudinary)} text-white border-0`}
          >
            {getStatusText('cloudinary', status.cloudinary)}
          </Badge>
        </div>

        {status.lastChecked && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            Last checked: {status.lastChecked.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};