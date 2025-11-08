
import { Logo } from "@/assets/Logo";
import HeroImg from "@/assets/HeroImgParcel.svg"
import TrackOrderInput from "./TrackOrderInput";

export const HeroSection = () => {
  return (
    <section className="overflow-hidden py-32">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              <Logo></Logo>
            </span>
            <h2 className="mx-auto max-w-5xl text-balance text-center text-3xl font-medium md:text-6xl">
              Largest and Reliable Currier Service In Your City
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-center md:text-lg">
              Fast, reliable, and secure parcel delivery made simple. Track your shipments, manage orders, and send parcels anywhere with ease.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
              {/* track order input */}
              <TrackOrderInput></TrackOrderInput>
            </div>
          </div>
          <img
            src={HeroImg}
            alt={"Banner Image"}
            className="mx-auto h-full max-h-[524px] w-full max-w-5xl rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

