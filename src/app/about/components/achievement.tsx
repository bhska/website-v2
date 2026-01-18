import { ViewAnimation } from '@/providers/view-animation';
import { Section } from '../../../components/common/section';
import { achievement } from '@/configs/achievement';
import Image from 'next/image';
import useNextBlurhash from 'use-next-blurhash';

const Achievement = () => {
  const [blurDataUrl] = useNextBlurhash('LDP?]y~q00jZ4o?aIUWB00soxuR*');

  return (
    <Section className="!border-r-0 !border-b-0">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.2}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-dashed flex h-full w-full flex-col border-b p-10 md:aspect-square md:border-r md:border-b-0">
            <div className="sticky top-28">
              <h2 className="font-mono text-3xl font-medium sm:text-4xl md:text-5xl">
                Certificates
              </h2>

              <p className="prose mt-4">
                An ambitious scholar and lifelong learner, dedicated to the pursuit of personal and
                academic achievement.
              </p>
            </div>
          </div>

          <div className="divide aspect-square w-full columns-1 gap-0 !border-b-0 last:border-r md:columns-2">
            {achievement.map((item, index) => (
              <div className="group relative flex h-auto w-full flex-col" key={item.title}>
                <div className="bg-dashed flex justify-center object-none p-6">
                  {item.image && (
                    <Image
                      src={item.image}
                      width={600}
                      height={300}
                      alt={item.title}
                      blurDataURL={blurDataUrl}
                      className="grayscale transition duration-200 ease-in-out group-hover:scale-101 group-hover:rotate-3 group-hover:shadow-md group-hover:grayscale-0"
                    />
                  )}
                </div>

                <div className="z-10 flex w-full flex-col justify-center p-4 text-center transition duration-200 ease-in-out group-hover:bg-white">
                  <span className="w-full text-center text-sm">{item.title}</span>
                  {/* <span className="hidden w-full justify-center text-center text-sm transition duration-200 ease-in-out group-hover:flex">
                    {item.year}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ViewAnimation>
    </Section>
  );
};

export default Achievement;
