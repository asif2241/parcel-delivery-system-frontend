import MissionImg from "@/assets/HeroImgParcel.svg"; // replace with your actual image path

export default function OurMission() {
    return (
        <section className="bg-white dark:bg-gray-900 py-24">
            <div className=" mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2">


                {/* Right: Image */}
                <div className="">
                    <div className=" w-full h-full rounded-3xl bg-indigo-100 dark:bg-indigo-900/20"></div>
                    <img
                        src={MissionImg}
                        alt="FastDrop mission illustration"
                        className=" w-full"
                    />
                </div>

                {/* Left: Text Content */}
                <div className="md:border-l-2 md:border-blue-500 pl-2">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                        At <span className="font-semibold text-indigo-600">FastDrop</span>,
                        our mission is to make parcel delivery faster, safer, and more
                        transparent for everyone. We believe that sending or receiving
                        packages should be as easy as a few clicks — no confusion, no delays.
                    </p>



                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <a
                            href="#"
                            className="inline-block rounded bg-indigo-600 px-6 py-3 text-white font-medium shadow hover:bg-indigo-700 transition-colors"
                        >
                            Learn More
                        </a>
                        <a
                            href="#"
                            className="inline-block rounded border border-gray-300 dark:border-gray-700 px-6 py-3 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
