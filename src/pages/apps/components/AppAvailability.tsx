import { Monitor, Smartphone, Globe } from 'lucide-react';
import { AppPlatform } from '../../../data/appGroups';
import { Button } from '../../../components/ui/Button';

interface AppAvailabilityProps {
  platforms: AppPlatform;
}

export function AppAvailability({ platforms }: AppAvailabilityProps) {
  return (
    <div className="mt-8 rounded-lg bg-gray-50 p-6">
      <h3 className="text-sm font-medium text-gray-900">Disponibilité</h3>
      
      <div className="mt-4 flex items-center gap-6">
        {platforms.web && (
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">Web</span>
          </div>
        )}
        {platforms.desktop && (
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">Desktop</span>
          </div>
        )}
        {platforms.mobile && (
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">Mobile</span>
          </div>
        )}
      </div>

      {platforms.downloadUrls && (
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Téléchargements</h4>
          <div className="grid grid-cols-2 gap-4">
            {platforms.downloadUrls.android && (
              <Button
                as="a"
                href={platforms.downloadUrls.android}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="justify-center"
              >
                Android
              </Button>
            )}
            {platforms.downloadUrls.ios && (
              <Button
                as="a"
                href={platforms.downloadUrls.ios}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="justify-center"
              >
                iOS
              </Button>
            )}
            {platforms.downloadUrls.windows && (
              <Button
                as="a"
                href={platforms.downloadUrls.windows}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="justify-center"
              >
                Windows
              </Button>
            )}
            {platforms.downloadUrls.mac && (
              <Button
                as="a"
                href={platforms.downloadUrls.mac}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="justify-center"
              >
                macOS
              </Button>
            )}
            {platforms.downloadUrls.linux && (
              <Button
                as="a"
                href={platforms.downloadUrls.linux}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="justify-center"
              >
                Linux
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}