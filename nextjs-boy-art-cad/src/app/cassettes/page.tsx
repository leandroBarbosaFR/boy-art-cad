import { notFound } from 'next/navigation'
import type { ProductPageData } from '../../lib/types/sanity'
import { getProductPageByType } from '../../sanity/client'
import ProductPage from '../components/ProductPage'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CassetePage() {
  const data: ProductPageData = await getProductPageByType('cassettes')

  if (!data) {
    notFound()
  }

  return <ProductPage data={data} productType="cassettes" />
}
