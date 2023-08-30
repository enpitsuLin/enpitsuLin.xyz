import type { Link, List, ListItem, Paragraph, Text } from 'mdast';
import { type Component, createEffect, createSignal } from 'solid-js';

function getRecursionIds(item: List | ListItem | Paragraph | Link | Text): string[] {
  if (item.type === 'text') return []
  if (item.type === 'link') return [item.url.slice(1)]

  return item
    .children
    .map((item) => getRecursionIds(item as List | ListItem | Paragraph))
    .flat()
}

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = createSignal(``);
  createEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -90% 0%` }
    );
    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);
  return activeId;
}

function renderItems(items: List, activeId: string, prefix = '') {
  return (
    <ol class="overflow-y-auto max-h-65vh" classList={{ 'pl-5': prefix != '' }}>
      {items?.children?.map((item, index) => (
        <li>
          {item.children
            .filter((i): i is Paragraph | List => ['paragraph', 'list'].includes(i.type))
            .map((listOrParagraph) => {
              if (listOrParagraph.type === 'list') return (
                <span>
                  {renderItems(listOrParagraph, activeId, `${index + 1}.`)}
                </span>
              )
              const link = (listOrParagraph.children[0] as Link)
              const children = link.children as Text[];
              const content = children.reduce((acc, curr) => acc + curr.value, '');

              return (
                <span>
                  <a
                    href={link.url}
                    title={content}
                    aria-hidden={activeId !== link.url.slice(1)}
                    class={`${activeId === link.url.slice(1)
                      ? 'text-neutral-700 dark:text-neutral '
                      : 'text-neutral dark:text-neutral-700'
                      } truncate inline-block max-w-full align-bottom hover:text-neutral`}
                  >
                    {`${prefix}${index + 1}. ${content}`}
                  </a>
                </span>
              );
            })}
        </li>
      ))}
    </ol>
  );
}

export const PostToc: Component<{ data: List }> = (props) => {
  let containerRef: HTMLDivElement | undefined;

  const [maxWidth, setMaxWidth] = createSignal(0);

  createEffect(() => {
    if (containerRef) {
      setMaxWidth(
        (window.innerWidth - (containerRef?.parentElement?.clientWidth || 0)) /
        2 -
        40
      );
    }
  });
  const idList = getRecursionIds(props.data);
  const activeId = useActiveId(idList);

  return (
    <div
      ref={containerRef}
      class="absolute left-full pl-10 h-full top-0"
      classList={{
        'hidden lg:block': maxWidth() > 40,
        hidden: maxWidth() < 40
      }}
      style={{
        'max-width': maxWidth() > 40 ? maxWidth() + 'px' : 0
      }}
    >
      <div class="sticky top-14 text-sm truncate leading-loose">
        {renderItems(props.data, activeId())}
      </div>
    </div>
  );
};
