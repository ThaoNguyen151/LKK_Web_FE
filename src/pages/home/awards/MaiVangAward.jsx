import imageCupMV from '@assets/images/cup/MV.png'
import { AwardBlock } from '@components/common'
import { awardYearPath } from '../../awards/awardsData'

const MAI_VANG_YEARS = [
  { label: '2023', href: `#${awardYearPath('2023')}` },
  { label: '2012', href: `#${awardYearPath('2012')}` },
  { label: '2015', href: `#${awardYearPath('2015')}` },
  { label: '2011', href: `#${awardYearPath('2011')}` },
  { label: '2013', href: `#${awardYearPath('2013')}` },
  { label: '2010', href: `#${awardYearPath('2010')}` },
]

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
      className="h-full pt-5"
      titleClassName="px-15 pb-10"
      yearsClassName="px-20 pb-2"
      cupClusterClassName="-mt-15"
    />
  )
}
