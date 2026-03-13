import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageHome4 from '@assets/image_home_4.png'

export function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* Section 1 - Hero */}
      <section className="relative flex h-screen snap-start items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container mx-auto flex items-center justify-between px-8">
          {/* Left side - Image */}
          <div className="flex-1">
            <img
              src={imageHome1}
              alt="Lê Hà Anh"
              className="h-auto w-full max-w-lg object-contain"
            />
            <div className="mt-4 inline-block rounded-full bg-orange-400 px-6 py-2 text-sm font-semibold text-white">
              # NGHỆ SĨ
            </div>
          </div>

          {/* Right side - Name and Info */}
          <div className="flex-1 text-right">
            <div className="mb-6 inline-block rounded-full bg-orange-400 px-6 py-2 text-sm font-semibold text-white">
              # DIỄN VIÊN
            </div>
            <h1 className="mb-6 font-display text-8xl italic text-purple-600">
              LÊ HÀ ANH
            </h1>
            <div className="flex justify-end gap-4">
              <div className="inline-block rounded-lg bg-purple-100 px-6 py-2 text-sm font-semibold text-purple-700">
                LÊ KIM KHÁNH
              </div>
              <div className="inline-block rounded-lg bg-purple-100 px-6 py-2 text-sm font-semibold text-purple-700">
                22 - 12 - 1981
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Bio with Stats */}
      <section className="relative flex h-screen snap-start items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-12">
            {/* Left side - Text and Stats */}
            <div>
              <h2 className="mb-6 font-display text-6xl italic text-purple-600">
                KHO TÀNG NGHỆ THUẬT
              </h2>
              <p className="mb-12 font-body text-lg leading-relaxed text-gray-700">
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

            {/* Right side - Image */}
            <div className="flex items-center justify-end">
              <img
                src={imageHome2}
                alt="Lê Khánh"
                className="h-auto w-full max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Awards */}
      <section className="relative flex h-screen snap-start items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container mx-auto px-8">
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
      <section className="relative flex h-screen snap-start items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-12">
            {/* Left side - Image */}
            <div className="flex items-center">
              <img
                src={imageHome4}
                alt="Lê Khánh"
                className="h-auto w-full max-w-lg object-contain"
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
