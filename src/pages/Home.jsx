import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageHome4 from '@assets/image_home_4.png'
import { Header } from '@components/common'
import imageTextHome1 from '@assets/images/Lê KHÁNH.png'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'

export function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      {/* Fixed Header */}
      <Header />

      {/* Section 1 - Hero */}
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-brand-soft">
        {/* DECORATION BACKGROUND */}
        <img
          src={rectLeft}
          className="pointer-events-none absolute left-0 top-0 z-0 w-[59  0px]"
        />

        <img
          src={rectRight}
          className="pointer-events-none absolute right-0 bottom-19 z-0 w-[420px]"
        />

        <img
          src={rectBottom}
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[600px] -translate-x-[70%]"
        />
        <div className="container relative mx-auto flex items-center px-8 pt-20">
          {/* LEFT IMAGE */}
          <div className="relative z-20 flex flex-1 items-end -ml-10">
            <img
              src={imageHome1}
              alt="Lê Khánh"
              className="h-auto w-full max-w-2xl scale-94 object-contain"
              style={{ marginTop: '-91px', marginLeft: '0px' }}
            />

            <div className="absolute top-114 right-[110px] rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white tracking-wide whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md whitespace-nowrap">
              # NGHỆ SĨ
            </div>
            {/* # NGHỆ SĨ */}

            <div className="absolute left-185 top-136 rounded-full bg-brand-header/20 px-6 py-3 text-sm font-semibold tracking-wide text-brand-home1 whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
              LÊ KIM KHÁNH
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex flex-1 flex-col">
            {/* # DIỄN VIÊN */}
            <div className="absolute right-40 bottom-23 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white tracking-wide whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
              # DIỄN VIÊN
            </div>

            <img
              src={imageTextHome1}
              alt="Lê Khánh"
              className="absolute left-[-120px] top-[-115px] z-30 w-[750px] object-contain"
            />

            <div className="absolute right-54 top-34 rounded-full bg-white/60 px-5 py-3 text-sm font-semibold tracking-wide text-brand-home1 whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
              22 • 12 • 1981
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Bio with Stats */}
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container relative z-10 mx-auto px-8 pt-20">
          <div className="grid grid-cols-2 gap-12">
            {/* Left side - Text and Stats */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 font-display text-7xl italic text-purple-600">
                KHO TÀNG NGHỆ THUẬT
              </h2>
              <p className="mb-12 font-body font-light text-lg leading-relaxed text-gray-700">
                Sau hơn 20 năm chăm chỉ hoạt động nghệ thuật, Lê Khánh đã hứu
                một kho tàng vai diễn
                <br />
                vô đa dạng mẫu sắc. Cô vinh dự được xếp vào hàng ngũ diễn viên
                thực lực của Việt Nam.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="rounded-2xl border-2 border-purple-200 bg-white/50 p-6 backdrop-blur-sm">
                  <div className="mb-2 font-display text-5xl font-bold text-purple-600">
                    100+
                  </div>
                  <div className="font-body text-sm uppercase tracking-wide text-gray-600">
                    VỞ DIỄN
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 font-display text-5xl font-bold text-purple-600">
                    35+
                  </div>
                  <div className="font-body text-sm uppercase tracking-wide text-gray-600">
                    PHIM TRUYỀN HÌNH
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 font-display text-5xl font-bold text-purple-600">
                    15+
                  </div>
                  <div className="font-body text-sm uppercase tracking-wide text-gray-600">
                    PHIM ĐIỆN ẢNH
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Image (larger and overlapping) */}
            <div className="relative -mr-12 flex items-center justify-end">
              <img
                src={imageHome2}
                alt="Lê Khánh"
                className="h-auto w-full max-w-2xl object-contain"
                style={{ marginTop: '-80px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Awards */}
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container relative z-10 mx-auto px-8 pt-20">
          <div className="grid grid-cols-3 gap-12">
            {/* Mai Vàng */}
            <div className="relative">
              <h3 className="mb-8 font-display text-5xl italic text-purple-600">
                MAI VÀNG
              </h3>
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="font-body text-lg text-purple-700">2023</div>
                <div className="font-body text-lg text-purple-700">2012</div>
                <div className="font-body text-lg text-purple-700">2015</div>
                <div className="font-body text-lg text-purple-700">2011</div>
                <div className="font-body text-lg text-purple-700">2013</div>
                <div className="font-body text-lg text-purple-700">2010</div>
              </div>
              <div className="relative">
                <div className="font-display text-9xl font-bold text-orange-400">
                  6
                </div>
                <div className="absolute bottom-0 right-0 text-6xl">🏆</div>
              </div>
            </div>

            {/* Festival Awards */}
            <div className="border-x-2 border-purple-200 px-8">
              <h3 className="mb-4 font-display text-4xl italic text-purple-600">
                LIÊN HOAN
                <br />
                SÂN KHẤU
              </h3>
              <div className="mb-4 font-body text-lg text-purple-700">2024</div>
              <div className="mb-8 flex justify-center text-7xl">🏆</div>

              <h3 className="mb-4 font-display text-4xl italic text-purple-600">
                LIÊN HOAN PHIM
                <br />
                VIỆT NAM
              </h3>
              <div className="mb-4 font-body text-lg text-purple-700">2011</div>
              <div className="flex justify-center text-7xl">🏆</div>
            </div>

            {/* HTV Awards */}
            <div className="relative">
              <h3 className="mb-8 font-display text-5xl italic text-purple-600">
                HTV
                <br />
                AWARDS
              </h3>
              <div className="mb-8">
                <div className="font-body text-lg text-purple-700">2008</div>
                <div className="font-body text-lg text-purple-700">2009</div>
              </div>
              <div className="relative">
                <div className="font-display text-9xl font-bold text-orange-400">
                  2
                </div>
                <div className="absolute bottom-0 right-0 text-6xl">🏆</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Fanzone */}
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container relative z-10 mx-auto px-8 pt-20">
          <div className="grid grid-cols-2 gap-12">
            {/* Left side - Image (larger and overlapping) */}
            <div className="relative -ml-12 flex items-center">
              <img
                src={imageHome4}
                alt="Lê Khánh"
                className="h-auto w-full max-w-2xl object-contain"
                style={{ marginTop: '-80px' }}
              />
            </div>

            {/* Right side - Fanzone Cards */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-12 font-display text-6xl italic text-purple-600">
                FANZONE
              </h2>

              {/* Fanpage Card 1 */}
              <div className="mb-6 rounded-3xl border-2 border-purple-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-purple-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                    <div className="flex h-full items-center justify-center text-2xl text-white">
                      👤
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 inline-block rounded-full bg-orange-400 px-3 py-1 text-xs font-semibold text-white">
                      FACEBOOK
                    </div>
                    <h3 className="font-body text-xl font-semibold text-purple-700">
                      CherishK - all about Lê Khánh
                    </h3>
                    <button className="mt-2 font-body text-sm text-purple-600 hover:text-purple-800">
                      FOLLOW NGAY →
                    </button>
                  </div>
                </div>
              </div>

              {/* Fanpage Card 2 */}
              <div className="rounded-3xl border-2 border-purple-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-purple-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                    <div className="flex h-full items-center justify-center text-2xl text-white">
                      👤
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 inline-block rounded-full bg-orange-400 px-3 py-1 text-xs font-semibold text-white">
                      FACEBOOK
                    </div>
                    <h3 className="font-body text-xl font-semibold text-purple-700">
                      1200 Hột É của chị Lê Khánh
                    </h3>
                    <button className="mt-2 font-body text-sm text-purple-600 hover:text-purple-800">
                      FOLLOW NGAY →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
