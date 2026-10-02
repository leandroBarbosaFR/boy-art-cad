import {getProductItemBySlug} from '@/sanity/client'
import {notFound} from 'next/navigation'
import ProductItemPage from '../../components/ProductItemPage'
import type {ProductItemData} from '@/lib/types/sanity'
export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{pageSlug: string; itemSlug: string}>
}) {
  const {pageSlug, itemSlug} = await params
  const data: ProductItemData | null = await getProductItemBySlug(pageSlug, itemSlug)

  if (!data?.item) {
    notFound()
  }

  return <ProductItemPage data={data} />
}
