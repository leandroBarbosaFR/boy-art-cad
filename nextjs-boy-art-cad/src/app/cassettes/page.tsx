import {notFound} from 'next/navigation'
import {getProductPageByType} from '../../sanity/client'
import ProductPage from '../components/ProductPage'
import type {ProductPageData} from '../../lib/types/sanity'
export const dynamic = 'force-dynamic'

export default async function CassetePage() {
  const data: ProductPageData = await getProductPageByType('cassettes')

  if (!data) {
    notFound()
  }

  return <ProductPage data={data} productType="cassettes" />
}
