'use client';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '../action-tooltip';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  id: string;
  imageUrl?: string | null;
  name: string;
}

export function NavigationItem({ id, imageUrl, name }: Props) {
  const params = useParams();
  const router = useRouter();

  function onClick() {
    router.push(`/servers/${id}`);
  }

  return (
    <div>
      <ActionTooltip label={name} side="right" align="center">
        <button className="group relative flex items-center" onClick={onClick}>
          <div
            className={cn(
              'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
              params?.serverId !== id && 'group-hover:h-[20px]',
              params?.serverId === id ? 'h-[36px]' : 'h-[8px]',
            )}
          />
          <div
            className={cn(
              'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center',
              params?.serverId !== id && 'bg-primary/10 text-primary rounded-[16px]',
              !imageUrl && 'bg-emerald-500',
            )}
          >
            {imageUrl ? (
              <Image fill src={imageUrl} alt="Channel" />
            ) : (
              <span className="text-white font-semibold text-lg">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
