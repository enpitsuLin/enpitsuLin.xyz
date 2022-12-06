import React from 'react';
import FaEnvelope from '~icons/fa6-solid/envelope';
import FaBilibili from '~icons/fa6-brands/bilibili';
import FaGithub from '~icons/fa6-brands/github';
import FaQq from '~icons/fa6-brands/qq';
import FaSteam from '~icons/fa6-brands/steam';
import FaZhihu from '~icons/fa6-brands/zhihu';

type SocialKind = 'mail' | 'github' | 'zhihu' | 'bilibili' | 'steam' | 'qq';

interface SocialIconProps {
  kind: SocialKind;
  href: string;
  size?: 'small' | 'medium' | 'large';
}

const components: Record<SocialKind, typeof FaQq> = {
  mail: FaEnvelope,
  github: FaGithub,
  zhihu: FaZhihu,
  bilibili: FaBilibili,
  steam: FaSteam,
  qq: FaQq
};
const sizeMap = {
  small: `h-6 w-6`,
  medium: `h-8 w-8`,
  large: `h-12 w-12`
};

export const SocialIcon: React.FC<SocialIconProps> = ({ kind, href, size = 'medium' }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))) return null;

  const SocialSvg = components[kind];
  const sizeClass = sizeMap[size];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={[
          `fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400`,
          sizeClass
        ].join(' ')}
      />
    </a>
  );
};
