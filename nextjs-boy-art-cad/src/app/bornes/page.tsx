import { notFound } from 'next/navigation'
import { getProductPageByType } from '../../sanity/client'
import ProductPage from '../components/ProductPage'
import type { ProductPageData } from '../../lib/types/sanity'

export default async function BornesPage() {
  const data: ProductPageData = await getProductPageByType('bornes')
  
  if (!data) {
    notFound()
  }

  return <ProductPage data={data} productType="bornes" />
}