import imageCupHTV from '@assets/images/cup/HTV.png'
import { AwardBlock } from '@components/common'
import { awardYearPath } from '../../awards/awardsData'

const HTV_YEARS = [
  { label: '2008', href: `#${awardYearPath('2008')}` },
  { label: '2009', href: `#${awardYearPath('2009')}` },
]

/** Cột HTV Awards — chỉnh layout tại file này */
export function HtvAward() {
  return (
    <AwardBlock
      variant="large"
      title={['HTV', 'AWARDS']}
      years={HTV_YEARS}
      count="2"
      cupSrc={imageCupHTV}
      cupAlt="Cup HTV"
      className="h-full pt-12"
      titleClassName="px-5 pb-10"
      yearsClassName="px-10 pb-2"
      cupClusterClassName="-mt-12 mr-20"
      cupClassName="scale-90"
    />
  )
}
