import type { Result as TocResult } from 'mdast-util-toc';
import { Component, createEffect, createSignal } from 'solid-js';

function getIds(items: TocResult['map']) {
  return (
    items?.children?.reduce((acc: string[], item) => {
      item.children.forEach((child) => {
        if (child.type === 'paragraph' && (child.children[0] as any).url) {
          acc.push((child.children[0] as any).url.slice(1));
        } else if (child.type === 'list') {
          acc.push(...getIds(child));
        }
      });
      return acc;
    }, []) || []
  );
}

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = createSignal(``)
  createEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -90% 0%` },
    )
    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })
    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])
  return activeId
}

function renderItems(items: TocResult["map"], activeId: string, prefix = "") {
  return (
    <ol class={prefix ? "pl-5" : ""}>
      {items?.children?.map((item, index) => (
        <li>
          {item.children.map((child: any) => {
            const children =
              child.children[0].children?.[0]?.children ||
              child.children[0].children
            const content = (children as { value: string }[]).reduce((acc, curr) => acc + curr.value, "");
            return (
              <span>
                {child.type === "paragraph" && child.children?.[0]?.url && (
                  <a
                    href={child.children[0].url}
                    title={content}
                    aria-hidden={activeId !== child.children[0].url.slice(1)}
                    class={
                      `${(activeId === child.children[0].url.slice(1)
                        ? "text-neutral-700 dark:text-neutral "
                        : "text-neutral dark:text-neutral-700")
                      } truncate inline-block max-w-full align-bottom hover:text-neutral`
                    }
                  >
                    {`${prefix}${index + 1}. ${content}`}
                  </a>
                )}
                {child.type === "list" &&
                  renderItems(child, activeId, `${index + 1}.`)}
              </span>
            )
          })}
        </li>
      ))}
    </ol>
  )
}

export const PostToc: Component<{ data: TocResult }> = (props) => {

  let containerRef: HTMLDivElement | undefined

  const [maxWidth, setMaxWidth] = createSignal(0)

  createEffect(() => {
    if (containerRef) {
      setMaxWidth(
        (window.innerWidth -
          (containerRef?.parentElement?.clientWidth || 0)) / 2
        -
        40,
      )
    }
  })

  const idList = getIds(props.data.map)
  const activeId = useActiveId(idList)

  return (
    <div
      ref={containerRef}
      class="absolute left-full pl-10 h-full top-0"
      classList={{ "hidden lg:block": maxWidth() > 40, 'hidden': maxWidth() < 40 }}
      style={{
        "max-width": maxWidth() > 40 ? maxWidth() + 'px' : 0,
      }}>
      <div class="sticky top-14 text-sm truncate leading-loose overflow-y-auto">
        {renderItems(props.data?.map, activeId())}
      </div>
    </div>
  )
}
