import React from 'react';
import { AnimatePresence, motion, SVGMotionProps, useCycle } from 'framer-motion';
import { Link } from './Link';

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  width?: number;
  height?: number;
  isOpen?: boolean;
}

const MobileNavMenuIcon: React.FC<IconProps> = ({ isOpen = false, width = 24, height = 24, ...props }) => {
  const variant = isOpen ? 'opened' : 'closed';

  const lineProps = {
    stroke: 'currentColor',
    strokeWidth: 2,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variant
  };
  const unitHeight = 24;
  const unitWidth = (unitHeight * (width as number)) / (height as number);

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
    >
      <motion.line
        x1="2"
        x2={unitWidth - 2}
        y1="5"
        y2="5"
        variants={{
          closed: {
            rotate: 0,
            translateY: 0
          },
          opened: {
            rotate: 45,
            translateY: 7
          }
        }}
        style={{ originX: '12px', originY: '5px' }}
        {...lineProps}
      />
      <motion.line
        x1="2"
        x2={unitWidth - 2}
        y1="12"
        y2="12"
        variants={{
          closed: {
            opacity: 1
          },
          opened: {
            opacity: 0
          }
        }}
        {...lineProps}
      />
      <motion.line
        x1="2"
        x2={unitWidth - 2}
        y1="19"
        y2="19"
        variants={{
          closed: {
            rotate: 0,
            translateY: 0
          },
          opened: {
            rotate: -45,
            translateY: -7
          }
        }}
        style={{ originX: '12px', originY: '19px' }}
        {...lineProps}
      />
    </motion.svg>
  );
};

export const MobileNav = ({ nav }: { nav: { href: string; title: string }[] }) => {
  const [open, cycleOpen] = useCycle(false, true);

  const onClick = () => {
    if (open) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    cycleOpen();
  };
  return (
    <div className="sm:hidden flex items-center">
      <motion.button type="button" className="h-8 w-8" aria-label="Toggle Menu" onClick={onClick}>
        <MobileNavMenuIcon isOpen={open} className="w-8 h-8 text-gray-900 dark:text-gray-100" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.aside
            animate={{
              width: '100%'
            }}
            exit={{
              width: 0,
              transition: { duration: 0.3 }
            }}
            initial={{ width: 0 }}
            className={`fixed top-[60px] right-0 z-10 h-screen w-full bg-gray-200 opacity-95 dark:bg-gray-800 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="fixed mt-8 h-full w-full">
              {nav.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                  onClick={onClick}
                >
                  <motion.div
                    className="px-12 py-4"
                    whileHover={{ scale: 1.1 }}
                    variants={{
                      closed: {
                        opacity: 0
                      },
                      open: { opacity: 1 }
                    }}
                  >
                    {link.title}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
