import type { PageContext } from '../renderer/types';
import { PageContextProvider } from '../hooks/usePageContext';
import { Header } from './Header';
import { Link } from './Link';
import { SocialIcon } from './SocialIcon';
import { StrictMode } from 'react';

export { PageWrapper };

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 mb-6 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="qq" href="http://wpa.qq.com/msgrd?v=3&uin=1092199651&site=qq&menu=yes" size="small" />
          <SocialIcon kind="mail" href={`mailto:enpitsulin@gmail.com`} size="small" />
          <SocialIcon kind="github" href="https://github.com/enpitsulin" size="small" />
          <SocialIcon kind="bilibili" href="https://space.bilibili.com/423632" size="small" />
          <SocialIcon kind="steam" href="https://steamcommunity.com/profiles/76561198338250608/" size="small" />
          <SocialIcon kind="zhihu" href="https://zhihu.com/people/enpitsulin" size="small" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/">enpitsulin</Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Powered by <Link href="https://vite-plugin-ssr.com/">vite-ssr</Link> Theme with{' '}
          <Link href="https://windicss.org/">Windicss</Link>
        </div>
      </div>
    </footer>
  );
}

const SectionContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">{children}</div>;
};

function PageWrapper({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Header />
        <SectionContainer>
          <div className="flex min-h-screen flex-col justify-between pt-24">
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </SectionContainer>
      </PageContextProvider>
    </StrictMode>
  );
}
