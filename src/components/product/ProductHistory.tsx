import { ProductHistory, ProductOwner } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { History, User, Link as LinkIcon } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface ProductHistoryProps {
  history: ProductHistory;
}

export function ProductHistory({ history }: ProductHistoryProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Product History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {history.previous_owners.map((owner: ProductOwner, index: number) => (
            <div key={index} className="border-b last:border-0 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Owner {index + 1}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDistance(new Date(owner.ownership_date), new Date(), { addSuffix: true })}
                </span>
              </div>
              
              {owner.social_media && (
                <div className="flex gap-4 mt-2">
                  {owner.social_media.twitter && (
                    <a 
                      href={`https://twitter.com/${owner.social_media.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                    >
                      <LinkIcon className="w-3 h-3" />
                      Twitter
                    </a>
                  )}
                  {owner.social_media.instagram && (
                    <a 
                      href={`https://instagram.com/${owner.social_media.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-pink-500 hover:underline"
                    >
                      <LinkIcon className="w-3 h-3" />
                      Instagram
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}