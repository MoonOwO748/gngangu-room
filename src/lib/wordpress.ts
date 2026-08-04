/**
 * WordPress Headless API Integration Module
 *
 * Supports both REST API (WP v2) and WPGraphQL endpoints.
 * Add NEXT_PUBLIC_WORDPRESS_URL in .env.local to activate live WP integration.
 */

export interface WPPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  date: string
  author?: string
  category?: string
  featuredImage?: string
}

export interface WPReview {
  id: string
  authorName: string
  rating: number // 1 ~ 5
  date: string
  content: string
  visitType?: string
}

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

/**
 * Fetch Blog Posts from WordPress REST API (Fast 3s timeout with fallback)
 */
export async function getBlogPosts(): Promise<WPPost[]> {
  if (WP_URL) {
    try {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=10`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000), // 3s timeout to prevent page delay
      })
      if (res.ok) {
        const posts = await res.json()
        if (Array.isArray(posts) && posts.length > 0) {
          return posts.map((p: any) => ({
            id: String(p.id),
            slug: p.slug,
            title: p.title?.rendered || '',
            excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
            content: p.content?.rendered || '',
            date: p.date?.split('T')[0] || '',
            category: p._embedded?.['wp:term']?.[0]?.[0]?.name || '가이드',
            featuredImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || undefined,
          }))
        }
      }
    } catch {
      // Fallback to demo content on error or timeout
    }
  }

  // Fallback demo data before WordPress connection
  return [
    {
      id: '1',
      slug: 'gangnam-karaoke-pricing-guide',
      title: '강남 가라오케 주대 & 예약 이용 가이드 (2025 최신판)',
      excerpt: '바가지 요금 없이 합리적으로 이용하는 강남 달토의 투명 정찰제 주대 및 얼리버드 5만원 할인 혜택 총정리.',
      date: '2025-08-01',
      category: '이용가이드',
    },
    {
      id: '2',
      slug: 'vip-business-entertainment-tips',
      title: '실패 없는 비즈니스 VIP 접대 룸 가라오케 선택법',
      excerpt: '거래처 귀빈을 모실 때 체크해야 할 룸 세팅, 수속 매끄러움, 고급 픽업 및 전담 매니저 배정 팁.',
      date: '2025-07-28',
      category: '비즈니스',
    },
    {
      id: '3',
      slug: 'group-party-karaoke-recommendation',
      title: '강남 회식 & 2차 모임 장소 추천: AK 달토 60개 룸 인프라',
      excerpt: '대규모 단체 인원도 여유롭게 수용 가능한 역삼동 프라이빗 룸과 회식 전용 주류 세트 구성 안내.',
      date: '2025-07-20',
      category: '모임안내',
    },
  ]
}

/**
 * Fetch Customer Reviews from WordPress or Fallback
 */
export async function getCustomerReviews(): Promise<WPReview[]> {
  if (WP_URL) {
    try {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/reviews?per_page=10`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000), // 3s timeout
      })
      if (res.ok) {
        const reviews = await res.json()
        if (Array.isArray(reviews) && reviews.length > 0) {
          return reviews.map((r: any) => ({
            id: String(r.id),
            authorName: r.title?.rendered || '고객님',
            rating: Number(r.acf?.rating || 5),
            date: r.date?.split('T')[0] || '',
            content: r.content?.rendered?.replace(/<[^>]+>/g, '') || '',
            visitType: r.acf?.visit_type || '방문 고객',
          }))
        }
      }
    } catch {
      // Fallback to demo content on error or timeout
    }
  }

  // Fallback demo customer reviews
  return [
    {
      id: 'r1',
      authorName: '김OO 대표님',
      rating: 5,
      date: '2025-08-02',
      visitType: '비즈니스 VIP 접대',
      content: '중요한 일본 거래처 바이오 관계자분들을 모시고 방문했는데, 실장님의 노련한 안내와 깔끔한 룸 분위기 덕분에 접대를 성공적으로 마쳤습니다. 정찰제라 더 안심되었습니다.',
    },
    {
      id: 'r2',
      authorName: '박OO 이사님',
      rating: 5,
      date: '2025-07-29',
      visitType: '팀 회식 2차',
      content: '팀원들 12명 단체로 2차 방문했습니다. 룸이 정말 넓고 음향 시설이 최고입니다. 9시 이전 입장이어서 5만원 할인 혜택까지 제대로 챙겼네요.',
    },
    {
      id: 'r3',
      authorName: '이OO 고객님',
      rating: 5,
      date: '2025-07-25',
      visitType: '친구들과 생일파티',
      content: '친구 생일이라 방문했는데 아가씨분들도 너무 다정하고 세심하게 챙겨주셔서 분위기가 너무 좋았습니다. 강남에서 가라오케 갈 땐 앞으로 달토만 올 것 같아요.',
    },
    {
      id: 'r4',
      authorName: '최OO 대표님',
      rating: 5,
      date: '2025-07-18',
      visitType: '귀빈 단독 방문',
      content: '혼자 가볍게 주류와 여유를 즐기러 들렀는데 눈치 보이지 않고 편안하게 대해주셔서 감동이었습니다. 주대 투명한 점이 가장 마음에 듭니다.',
    },
  ]
}
