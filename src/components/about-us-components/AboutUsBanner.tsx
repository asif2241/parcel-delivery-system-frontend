import AboutUsBannerImg from "@/assets/images/AboutUsBanner.png"

export default function AboutUsBanner() {
    return (
        <section className="bg-white lg:grid lg:items-center dark:bg-gray-900">
            <div className="mx-auto w-screen max-w-7xl px-4 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8">
                <div className="max-w-prose text-left mb-4">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                        About Our Company
                        <strong className="text-indigo-600"> Innovating </strong>
                        for a Better Future
                    </h1>

                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
                        We are a passionate team dedicated to delivering innovative solutions that drive growth and transform businesses. With years of expertise and a commitment to excellence, we help our clients achieve their goals through cutting-edge technology and strategic thinking.
                    </p>
                    <div className="mt-4 flex gap-4 sm:mt-6">
                        <a
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                            href="#"
                        >
                            Get Started
                        </a>

                        <a
                            className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
                <img
                    className="mx-auto  bg-blue-400 rounded-t-full w-full max-w-md object-contain"
                    src={AboutUsBannerImg}
                    alt="About Us Banner"
                />

            </div>
        </section>
    )
}
