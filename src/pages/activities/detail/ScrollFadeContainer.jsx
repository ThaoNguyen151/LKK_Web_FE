import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@utils'
import { GridEdgeBlur } from '../ActivitiesBackdrop'

const FADE_THRESHOLD = 8
const FADE_BOTTOM_OFFSET = 48
const SCROLL_TOP_THRESHOLD = 120

/**
 * @typedef {object} ScrollFadeContainerProps
 * @property {import('react').ReactNode} children
 * @property {string} [className]
 * @property {string} [innerClassName]
 * @property {any} [scrollKey]
 * @property {boolean} [extendBleed]
 * @property {number} [shadowGutter] Thêm lề trong vùng bleed để shadow hover không bị cắt
 * @property {boolean} [containTopFade] Mờ trên chỉ trong khung nội dung (không nở bleed / không đè poster)
 * @property {import('react').RefObject<HTMLElement | null>} [sidebarRef]
 * @property {(state: { scrolled: boolean, showHint: boolean }) => void} [onScrollState]
 */

/**
 * Container cuộn dọc với viền mờ trên/dưới.
 * `extendBleed`: nở vùng cuộn + viền mờ sang padding trái (tới sidebar)
 * và phải (tới mép viewport); nội dung giữ nguyên kích thước.
 *
 * @type {import('react').ForwardRefExoticComponent<
 *   ScrollFadeContainerProps & import('react').RefAttributes<{ scrollToTop: () => void }>
 * >}
 */
export const ScrollFadeContainer = forwardRef(
  /**
   * @param {ScrollFadeContainerProps} props
   * @param {import('react').Ref<{ scrollToTop: () => void }>} ref
   */
  function ScrollFadeContainer(
    {
      children,
      className,
      innerClassName,
      scrollKey,
      extendBleed = false,
      shadowGutter = 0,
      containTopFade = false,
      sidebarRef,
      onScrollState,
    },
    ref
  ) {
    const frameRef = useRef(/** @type {HTMLDivElement | null} */ (null))
    const scrollRef = useRef(/** @type {HTMLDivElement | null} */ (null))
    const onScrollStateRef = useRef(onScrollState)
    const [showTop, setShowTop] = useState(false)
    const [showBottom, setShowBottom] = useState(false)
    const [bleed, setBleed] = useState({ left: 0, right: 0 })

    useEffect(() => {
      onScrollStateRef.current = onScrollState
    }, [onScrollState])

    useImperativeHandle(ref, () => ({
      scrollToTop() {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      },
    }))

    useLayoutEffect(() => {
      if (!extendBleed) return undefined

      const updateBleed = () => {
        const frame = frameRef.current
        if (!frame) return

        const frameRect = frame.getBoundingClientRect()
        const right = Math.max(0, window.innerWidth - frameRect.right)

        let left = Math.max(0, frameRect.left)
        const sidebarEl = sidebarRef?.current
        const sidebarVisible =
          sidebarEl &&
          window.getComputedStyle(sidebarEl).display !== 'none' &&
          sidebarEl.getBoundingClientRect().width > 0

        if (sidebarVisible) {
          const sideRect = sidebarEl.getBoundingClientRect()
          left = Math.max(0, frameRect.left - sideRect.right)
        }

        setBleed(prev =>
          prev.left === left && prev.right === right ? prev : { left, right }
        )
      }

      updateBleed()
      window.addEventListener('resize', updateBleed)
      return () => window.removeEventListener('resize', updateBleed)
    }, [extendBleed, sidebarRef, scrollKey])

    useEffect(() => {
      const el = scrollRef.current
      if (!el) return undefined

      const update = () => {
        const maxScroll = el.scrollHeight - el.clientHeight
        const scrolled = el.scrollTop > SCROLL_TOP_THRESHOLD
        const atBottom =
          maxScroll <= FADE_THRESHOLD ||
          el.scrollTop >= maxScroll - FADE_BOTTOM_OFFSET
        setShowTop(el.scrollTop > FADE_THRESHOLD)
        setShowBottom(maxScroll > FADE_THRESHOLD && !atBottom)
        onScrollStateRef.current?.({
          scrolled,
          showHint: maxScroll > FADE_THRESHOLD && !atBottom,
        })
      }

      update()
      el.addEventListener('scroll', update, { passive: true })
      window.addEventListener('resize', update)
      return () => {
        el.removeEventListener('scroll', update)
        window.removeEventListener('resize', update)
      }
    }, [scrollKey, bleed.left, bleed.right, shadowGutter])

    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0
    }, [scrollKey])

    const padLeft = bleed.left + shadowGutter
    const padRight = bleed.right + shadowGutter
    // Fade rộng từ sát sidebar → mép phải viewport (không co trong frame)
    const fadeInset =
      extendBleed && shadowGutter > 0
        ? { left: shadowGutter, right: shadowGutter }
        : undefined

    return (
      <div ref={frameRef} className={cn('relative min-h-0', className)}>
        <div
          className={
            extendBleed ? 'absolute inset-y-0 flex flex-col' : 'contents'
          }
          style={
            extendBleed
              ? {
                  left: -padLeft,
                  width: `calc(100% + ${padLeft + padRight}px)`,
                }
              : undefined
          }
        >
          <div
            ref={scrollRef}
            className={cn(
              'h-full overflow-y-auto hide-scrollbar',
              innerClassName
            )}
            style={
              extendBleed
                ? {
                    paddingLeft: padLeft,
                    paddingRight: padRight,
                  }
                : undefined
            }
          >
            {children}
          </div>

          {!containTopFade ? (
            <GridEdgeBlur edge="top" show={showTop} style={fadeInset} />
          ) : null}
          <GridEdgeBlur edge="bottom" show={showBottom} style={fadeInset} />
        </div>

        {/* Mờ trên chỉ trong khung nội dung — không đè poster / không theo bleed */}
        {containTopFade ? <GridEdgeBlur edge="top" show={showTop} /> : null}
      </div>
    )
  }
)
