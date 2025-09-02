'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import pageStyles from '../../page.module.css'
import styles from './commentsCarousel.module.css'

type Comment = {
  id: string
  name: string | null
  avatar_url: string | null
  content: string
  rating: number
  created_at: string
}

export default function CommentsCarousel() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [itemsPerView, setItemsPerView] = useState<number>(3)
  const autoplayRef = useRef<number | null>(null)
  const interactionRef = useRef<boolean>(false)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef<number>(0)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetch('/api/comments?post_id=landing')
      .then(async (r) => {
        if (!r.ok) {
          const data = await r.json().catch(() => ({}))
          throw new Error(data?.error || 'Falha ao carregar comentários')
        }
        return r.json() as Promise<Comment[]>
      })
      .then((data) => {
        if (!isMounted) return
        setComments(data || [])
      })
      .catch((err: unknown) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Erro inesperado')
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const hasItems = comments.length > 0
  const numPages = useMemo(() => {
    if (!hasItems) return 1
    return Math.max(1, Math.ceil(comments.length / itemsPerView))
  }, [comments.length, itemsPerView, hasItems])

  // Responsivo: 3/2/1 itens por visão
  useEffect(() => {
    function compute() {
      if (typeof window === 'undefined') return 1
      const w = window.innerWidth
      if (w >= 1024) return 3
      if (w >= 640) return 2
      return 1
    }
    function onResize() {
      setItemsPerView(compute())
    }
    setItemsPerView(compute())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Garante index dentro do limite ao mudar dados ou viewport
  useEffect(() => {
    setIndex((prev) => Math.min(prev, numPages - 1))
  }, [numPages])

  function handlePrev() {
    if (!hasItems) return
    setIndex((prev) => (prev - 1 + numPages) % numPages)
  }

  function handleNext() {
    if (!hasItems) return
    setIndex((prev) => (prev + 1) % numPages)
  }

  // Autoplay
  useEffect(() => {
    if (!hasItems) return
    if (numPages <= 1) return
    if (interactionRef.current) return
    autoplayRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % numPages)
    }, 4000)
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [hasItems, numPages])

  function pauseAutoplayTemporarily() {
    interactionRef.current = true
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
    window.setTimeout(() => {
      interactionRef.current = false
    }, 6000)
  }

  // Swipe handlers
  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    pauseAutoplayTemporarily()
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }
  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current == null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }
  function onTouchEnd() {
    const delta = touchDeltaX.current
    touchStartX.current = null
    touchDeltaX.current = 0
    const threshold = 40
    if (Math.abs(delta) > threshold) {
      if (delta > 0) handlePrev(); else handleNext()
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingBar} />
      </div>
    )
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>
  }

  if (!hasItems) {
    return <p className={styles.emptyMessage}>Seja o primeiro a comentar!</p>
  }

  return (
    <div className={styles.carousel}>
      <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Anterior">‹</button>

      <div
        className={styles.viewport}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {comments.map((c) => {
            const avatar = c.avatar_url || '/images/LogoOhboss.png'
            return (
              <div key={c.id} className={styles.slide} style={{ minWidth: `${100 / itemsPerView}%` }}>
                <div className={pageStyles.testimonialsBox}>
                  <div className={pageStyles.testimonialsImgBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} alt={c.name || 'Avatar'} />
                  </div>
                  <div className={pageStyles.testimonialsText}>
                    <p>{c.content}</p>
                    <h3>{c.name || 'Anônimo'}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button className={styles.arrowBtn} onClick={handleNext} aria-label="Próximo">›</button>

      <div className={styles.dots}>
        {Array.from({ length: numPages }).map((_, i) => (
          <button
            key={i}
            className={i === index ? styles.dotActive : styles.dot}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


