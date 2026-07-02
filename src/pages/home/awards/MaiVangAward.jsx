import imageCupMV from '@assets/images/cup/MV.png'
import { AwardBlock } from '@components/common'

const MAI_VANG_YEARS = ['2023', '2012', '2015', '2011', '2013', '2010']

/** Cột Mai Vàng — chỉnh layout tại file này */
export function MaiVangAward() {
  return (
    <AwardBlock
      variant="large"
      title="MAI VÀNG"
      years={MAI_VANG_YEARS}
      yearColumns={2}
      count="6"
      cupSrc={imageCupMV}
      cupAlt="Cup Mai Vàng"
      className="h-full pt-12"
      titleClassName="px-15 pb-10"
      yearsClassName="px-20 pb-2"
      cupClusterClassName="-mt-15"
    />
  )
}
