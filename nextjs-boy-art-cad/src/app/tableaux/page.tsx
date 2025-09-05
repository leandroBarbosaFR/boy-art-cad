import {notFound} from 'next/navigation'
import {getProductPageByType} from '../../sanity/client'
import ProductPage from '../components/ProductPage'
import type {ProductPageData} from '../../lib/types/sanity'
export const dynamic = 'force-dynamic'

export default async function TableauxPage() {
  const data: ProductPageData = await getProductPageByType('tableaux')

  if (!data) {
    notFound()
  }

  return <ProductPage data={data} productType="tableaux" />
}
